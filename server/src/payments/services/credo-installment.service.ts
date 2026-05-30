import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as crypto from 'crypto';

export interface CredoProduct {
  id: string;
  title: string;
  amount: number;
  price: number;
  type: string;
}

interface CredoOrderResponse {
  status: number;
  message: string;
  data?: {
    URL?: string;
  };
  errors?: {
    code?: string;
    message?: string;
  };
}

export interface CredoStatusResponse {
  status: number;
  message: string;
  data: number | null;
  info?: {
    FirstName: string;
    LastName: string;
    PersonalNumber: string;
    Mobile: string;
  };
}

export enum CredoInstallmentStatus {
  NEED_IDENTIFICATION = 10,
  SENT = 2,
  SENT_TO_BRANCH = 9,
  SENT_TO_BACK_OFFICE_2 = 14,
  APPROVED = 3,
  LATEST_APPROVED = 4,
  DOCUMENT_ASSIGNED = 12,
  CLOSED_SUCCESSFULLY = 5,
  REJECTED = 6,
  CANCELED = 7,
  DRAFT = 11,
  SENT_TO_VIDEO_MONITORING = 13,
}

export const CredoStatusNames: Record<number, string> = {
  [CredoInstallmentStatus.NEED_IDENTIFICATION]: 'იდენტიფიკაცია საჭიროა',
  [CredoInstallmentStatus.SENT]: 'მუშავდება',
  [CredoInstallmentStatus.SENT_TO_BRANCH]: 'ფილიალში გაგზავნილია',
  [CredoInstallmentStatus.SENT_TO_BACK_OFFICE_2]: 'ბანკში განხილვაზეა',
  [CredoInstallmentStatus.APPROVED]: 'დამტკიცებულია',
  [CredoInstallmentStatus.LATEST_APPROVED]: 'ხელმოწერა საჭიროა',
  [CredoInstallmentStatus.DOCUMENT_ASSIGNED]: 'პროდუქტი უნდა გაიგზავნოს',
  [CredoInstallmentStatus.CLOSED_SUCCESSFULLY]: 'დასრულებულია',
  [CredoInstallmentStatus.REJECTED]: 'უარყოფილია',
  [CredoInstallmentStatus.CANCELED]: 'გაუქმებულია',
  [CredoInstallmentStatus.DRAFT]: 'მონახაზი',
  [CredoInstallmentStatus.SENT_TO_VIDEO_MONITORING]: 'ვიდეო მონიტორინგზეა',
};

@Injectable()
export class CredoInstallmentService {
  private readonly logger = new Logger(CredoInstallmentService.name);
  private readonly apiUrl = 'https://ganvadeba.credo.ge/widget_api/order.php';
  private readonly statusUrl = 'https://ganvadeba.credo.ge/widget/api.php';

  constructor(private readonly configService: ConfigService) {}

  private getMerchantId(): string {
    const merchantId = this.configService.get<string>(
      'CREDO_INSTALLMENT_MERCHANT_ID',
    );

    if (!merchantId) {
      throw new Error('CREDO_INSTALLMENT_MERCHANT_ID is not configured');
    }

    return merchantId;
  }

  private getSecretBuffer(): Buffer {
    const secret = this.configService.get<string>('CREDO_INSTALLMENT_SECRET');

    if (!secret) {
      throw new Error('CREDO_INSTALLMENT_SECRET is not configured');
    }

    return Buffer.from(secret.replace(/\\0/g, '\x00'), 'binary');
  }

  private generateCheckHash(products: CredoProduct[]): string {
    const stringToHash = products
      .map(
        (product) =>
          `${product.id}${product.title}${product.amount}${product.price}${product.type}`,
      )
      .join('');

    return crypto
      .createHash('md5')
      .update(
        Buffer.concat([
          Buffer.from(stringToHash, 'utf8'),
          this.getSecretBuffer(),
        ]),
      )
      .digest('hex');
  }

  private generateStatusHash(orderCode: string): string {
    return crypto
      .createHash('md5')
      .update(
        Buffer.concat([
          Buffer.from(`${this.getMerchantId()}${orderCode}`, 'utf8'),
          this.getSecretBuffer(),
        ]),
      )
      .digest('hex');
  }

  async createInstallmentOrder(
    orderCode: string,
    products: CredoProduct[],
  ): Promise<{ redirectUrl: string; orderCode: string }> {
    const payload = {
      merchantId: this.getMerchantId(),
      orderCode,
      check: this.generateCheckHash(products),
      products,
    };

    this.logger.log(
      `Creating Credo installment order ${orderCode} with ${products.length} products`,
    );

    try {
      const response = await axios.post<CredoOrderResponse>(
        this.apiUrl,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      this.logger.log(
        `Credo installment response: ${JSON.stringify(response.data)}`,
      );

      const redirectUrl = response.data?.data?.URL;
      if (redirectUrl) {
        return { redirectUrl, orderCode };
      }

      throw new Error(
        response.data?.errors?.message ||
          response.data?.message ||
          'Credo installment order creation failed',
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorData = error.response?.data as CredoOrderResponse;
        const errorCode = errorData?.errors?.code || '';
        const errorMessage =
          errorData?.errors?.message || errorData?.message || error.message;

        this.logger.error(
          `Credo API error: ${error.response?.status} - ${JSON.stringify(
            errorData,
          )}`,
        );

        throw new Error(`Credo API error: ${errorCode} - ${errorMessage}`);
      }

      throw error;
    }
  }

  async getInstallmentStatus(orderCode: string): Promise<CredoStatusResponse> {
    const merchantId = this.getMerchantId();
    const hash = this.generateStatusHash(orderCode);
    const url = `${this.statusUrl}?merchantId=${merchantId}&orderCode=${encodeURIComponent(
      orderCode,
    )}&hash=${hash}`;

    this.logger.log(`Checking Credo installment status: ${orderCode}`);

    const response = await axios.get<CredoStatusResponse>(url);
    this.logger.log(`Credo status response: ${JSON.stringify(response.data)}`);

    return response.data;
  }

  isInstallmentSuccessful(statusId: number): boolean {
    return statusId === CredoInstallmentStatus.CLOSED_SUCCESSFULLY;
  }

  isReadyForShipment(statusId: number): boolean {
    return statusId === CredoInstallmentStatus.DOCUMENT_ASSIGNED;
  }

  isInstallmentFailed(statusId: number): boolean {
    return (
      statusId === CredoInstallmentStatus.REJECTED ||
      statusId === CredoInstallmentStatus.CANCELED
    );
  }

  isInstallmentPending(statusId: number): boolean {
    return [
      CredoInstallmentStatus.NEED_IDENTIFICATION,
      CredoInstallmentStatus.SENT,
      CredoInstallmentStatus.SENT_TO_BRANCH,
      CredoInstallmentStatus.SENT_TO_BACK_OFFICE_2,
      CredoInstallmentStatus.APPROVED,
      CredoInstallmentStatus.LATEST_APPROVED,
      CredoInstallmentStatus.DRAFT,
      CredoInstallmentStatus.SENT_TO_VIDEO_MONITORING,
    ].includes(statusId);
  }

  getStatusName(statusId: number): string {
    return CredoStatusNames[statusId] || 'უცნობი სტატუსი';
  }
}
