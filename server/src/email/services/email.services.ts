import { emailConfig } from '@/email.config';
import { Injectable } from '@nestjs/common';

import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    console.log('🔧 EmailService constructor called');
    console.log('📧 Email config:', {
      host: emailConfig.host,
      port: emailConfig.port,
      secure: emailConfig.secure,
      user: emailConfig.auth.user ? '***' : 'NOT SET',
      pass: emailConfig.auth.pass ? '***' : 'NOT SET',
      from: emailConfig.from,
    });

    this.transporter = nodemailer.createTransport({
      host: emailConfig.host, // ✅ `service` არ არის საჭირო
      port: emailConfig.port,
      secure: emailConfig.secure,
      auth: {
        user: emailConfig.auth.user,
        pass: emailConfig.auth.pass,
      },
      tls: {
        rejectUnauthorized: false, // ✅ სერტიფიკატის გადამოწმების გამორთვა
      },
    });

    console.log('✅ Email transporter created successfully');
  }

  async sendPasswordResetEmail(to: string, resetToken: string) {
    const resetLink = `${process.env.ALLOWED_ORIGINS}/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: emailConfig.from,
      to,
      subject: 'Password Reset Request',
      html: `
        <p>თქვენს ანგარიშზე პაროლის აღდგენის მოთხოვნა შევიდა.</p>
        <p>პაროლის აღსადგენად დააჭირეთ ქვემოთ მოცემულ ბმულს:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>თუ ეს თქვენ არ გაგიგზავნიათ, უბრალოდ არ იმოქმედოთ.</p>
      `,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendOrderConfirmationEmail(orderData: {
    customerEmail: string;
    orderId: string;
    customerName: string;
    items: Array<{
      name: string;
      quantity: number;
      price: number;
      size?: string;
      color?: string;
      ageGroup?: string;
    }>;
    totalAmount: number;
    shippingAddress: {
      firstName: string;
      lastName: string;
      address: string;
      city: string;
      postalCode?: string;
      phoneNumber: string;
    };
    paymentMethod: string;
    orderDate: string;
  }) {
    console.log('🚀 ATTEMPTING TO SEND CUSTOMER EMAIL:', {
      customerEmail: orderData.customerEmail,
      orderId: orderData.orderId,
      customerName: orderData.customerName,
    });

    try {
      const itemsHtml = orderData.items
        .map(
          (item) => `
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px; border-right: 1px solid #eee;">
            <strong>${item.name}</strong>
            ${item.size ? `<br><small>ზომა: ${item.size}</small>` : ''}
            ${item.color ? `<br><small>ფერი: ${item.color}</small>` : ''}
            ${item.ageGroup ? `<br><small>ასაკი: ${item.ageGroup}</small>` : ''}
          </td>
          <td style="padding: 12px; text-align: center; border-right: 1px solid #eee;">${item.quantity}</td>
          <td style="padding: 12px; text-align: right;">${item.price.toFixed(2)} ლარი</td>
        </tr>
      `,
        )
        .join('');

      const mailOptions = {
        from: emailConfig.from,
        to: orderData.customerEmail,
        subject: `შეკვეთის დადასტურება - #${orderData.orderId}`,
        html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>შეკვეთის დადასტურება</title>
        </head>
        <body style="font-family: 'FiraGo', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 30px; border-bottom: 3px solid #4b5320; padding-bottom: 20px;">
              <h1 style="color: #4b5320; margin: 0; font-size: 28px;">🎯 MYHUNTER</h1>
              <p style="color: #666; margin: 5px 0 0 0; font-size: 16px;">ნადირობისა და თევზაობის ექსპერტები</p>
            </div>

            <!-- Order Confirmation -->
            <div style="margin-bottom: 30px;">
              <h2 style="color: #2d8a3e; margin-bottom: 15px;">✅ შეკვეთა წარმატებით დადასტურდა!</h2>
              <p style="font-size: 16px; margin-bottom: 10px;">გმადლობთ, <strong>${orderData.customerName}</strong>!</p>
              <p style="color: #666;">თქვენი შეკვეთა მიღებულია და დამუშავების პროცესშია.</p>
            </div>

            <!-- Order Details -->
            <div style="margin-bottom: 30px;">
              <h3 style="color: #4b5320; margin-bottom: 15px; border-bottom: 2px solid #eee; padding-bottom: 5px;">📋 შეკვეთის დეტალები</h3>
              <table style="width: 100%; margin-bottom: 15px;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">შეკვეთის ნომერი:</td>
                  <td style="padding: 8px 0; color: #2d8a3e; font-weight: bold;">#${orderData.orderId}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">თარიღი:</td>
                  <td style="padding: 8px 0;">${orderData.orderDate}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">გადახდის მეთოდი:</td>
                  <td style="padding: 8px 0;">${orderData.paymentMethod}</td>
                </tr>
              </table>
            </div>

            <!-- Items Table -->
            <div style="margin-bottom: 30px;">
              <h3 style="color: #4b5320; margin-bottom: 15px; border-bottom: 2px solid #eee; padding-bottom: 5px;">🛒 შეკვეთილი პროდუქტები</h3>
              <table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd; border-radius: 5px; overflow: hidden;">
                <thead>
                  <tr style="background-color: #f8f9fa;">
                    <th style="padding: 12px; text-align: left; border-right: 1px solid #eee; font-weight: bold; color: #4b5320;">პროდუქტი</th>
                    <th style="padding: 12px; text-align: center; border-right: 1px solid #eee; font-weight: bold; color: #4b5320;">რაოდენობა</th>
                    <th style="padding: 12px; text-align: right; font-weight: bold; color: #4b5320;">ფასი</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
                <tfoot>
                  <tr style="background-color: #2d8a3e; color: white; font-weight: bold;">
                    <td colspan="2" style="padding: 15px; text-align: right;">სულ ჯამი:</td>
                    <td style="padding: 15px; text-align: right; font-size: 18px;">${orderData.totalAmount.toFixed(2)} ლარი</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <!-- Shipping Address -->
            <div style="margin-bottom: 30px;">
              <h3 style="color: #4b5320; margin-bottom: 15px; border-bottom: 2px solid #eee; padding-bottom: 5px;">🚚 მიწოდების მისამართი</h3>
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #2d8a3e;">
                <p style="margin: 0 0 8px 0;"><strong>${orderData.shippingAddress.firstName} ${orderData.shippingAddress.lastName}</strong></p>
                <p style="margin: 0 0 8px 0;">${orderData.shippingAddress.address}</p>
                <p style="margin: 0 0 8px 0;">${orderData.shippingAddress.city}${orderData.shippingAddress.postalCode ? `, ${orderData.shippingAddress.postalCode}` : ''}</p>
                <p style="margin: 0 0 8px 0;">📞 ${orderData.shippingAddress.phoneNumber}</p>
              </div>
            </div>

            <!-- Next Steps -->
            <div style="margin-bottom: 30px;">
              <h3 style="color: #4b5320; margin-bottom: 15px; border-bottom: 2px solid #eee; padding-bottom: 5px;">📦 შემდგომი ნაბიჯები</h3>
              <ul style="color: #666; padding-left: 20px;">
                <li style="margin-bottom: 8px;">თქვენი შეკვეთა დამუშავების პროცესშია</li>
                <li style="margin-bottom: 8px;">1-2 სამუშაო დღის განმავლობაში მოვამზადებთ თქვენს შეკვეთას</li>
                <li style="margin-bottom: 8px;">მიწოდების დროს გაგიგზავნით SMS შეტყობინება</li>
                <li style="margin-bottom: 8px;">შეკვეთის სტატუსი შეგიძლიათ მონიტორინგი გაუწიოთ ჩვენს ვებსაიტზე</li>
              </ul>
            </div>

            <!-- Contact Info -->
            <div style="background-color: #4b5320; color: white; padding: 20px; border-radius: 8px; text-align: center;">
              <h3 style="margin: 0 0 15px 0;">📞 კონტაქტი</h3>
              <p style="margin: 0 0 8px 0;">კითხვების შემთხვევაში დაგვიკავშირდით:</p>
              <p style="margin: 0 0 8px 0;">📧 info@myhunter.ge</p>
              <p style="margin: 0 0 8px 0;">📱 +995 XXX XXX XXX</p>
              <p style="margin: 0;">🌐 www.myhunter.ge</p>
            </div>

            <!-- Footer -->
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #666; font-size: 14px;">
              <p>გმადლობთ MYHUNTER-ის არჩევისთვის! 🎯</p>
              <p style="margin: 10px 0 0 0;">© 2025 MYHUNTER. ყველა უფლება დაცულია.</p>
            </div>

          </div>
        </body>
        </html>
      `,
      };

      await this.transporter.sendMail(mailOptions);
      console.log('✅ CUSTOMER EMAIL SENT SUCCESSFULLY!');
    } catch (error) {
      console.error('❌ ERROR SENDING CUSTOMER EMAIL:', error);
      throw error;
    }
  }

  async sendAdminOrderNotification(orderData: {
    orderId: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    items: Array<{
      name: string;
      quantity: number;
      price: number;
      size?: string;
      color?: string;
      ageGroup?: string;
    }>;
    totalAmount: number;
    shippingAddress: {
      firstName: string;
      lastName: string;
      address: string;
      city: string;
      postalCode?: string;
      phoneNumber: string;
    };
    paymentMethod: string;
    orderDate: string;
  }) {
    console.log('🚀 ATTEMPTING TO SEND ADMIN EMAIL:', {
      orderId: orderData.orderId,
      customerEmail: orderData.customerEmail,
      adminEmail: process.env.ADMIN_EMAIL,
    });

    try {
      const itemsHtml = orderData.items
        .map(
          (item) => `
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 10px; border-right: 1px solid #eee;">
            <strong>${item.name}</strong>
            ${item.size ? `<br><small>ზომა: ${item.size}</small>` : ''}
            ${item.color ? `<br><small>ფერი: ${item.color}</small>` : ''}
            ${item.ageGroup ? `<br><small>ასაკი: ${item.ageGroup}</small>` : ''}
          </td>
          <td style="padding: 10px; text-align: center; border-right: 1px solid #eee;">${item.quantity}</td>
          <td style="padding: 10px; text-align: right;">${item.price.toFixed(2)} ლარი</td>
        </tr>
      `,
        )
        .join('');

      // Admin email - send to store management
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@myhunter.ge';

      const mailOptions = {
        from: emailConfig.from,
        to: adminEmail,
        subject: `🛒 ახალი შეკვეთა - #${orderData.orderId}`,
        html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>ახალი შეკვეთა</title>
        </head>
        <body style="font-family: 'FiraGo', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 30px; border-bottom: 3px solid #e74c3c; padding-bottom: 20px;">
              <h1 style="color: #e74c3c; margin: 0; font-size: 28px;">🚨 ახალი შეკვეთა!</h1>
              <p style="color: #666; margin: 5px 0 0 0; font-size: 16px;">MYHUNTER Admin Panel</p>
            </div>

            <!-- Order Alert -->
            <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin-bottom: 25px; border-radius: 5px;">
              <h3 style="color: #856404; margin: 0 0 10px 0;">⚡ URGENT: ახალი შეკვეთა მიღებულია</h3>
              <p style="margin: 0; color: #856404;">შეკვეთა #${orderData.orderId} დაუყოვნებლივ დამუშავებას ითხოვს</p>
            </div>

            <!-- Customer Info -->
            <div style="margin-bottom: 25px;">
              <h3 style="color: #e74c3c; margin-bottom: 15px;">👤 მყიდველის ინფორმაცია</h3>
              <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px;">
                <p style="margin: 0 0 8px 0;"><strong>სახელი:</strong> ${orderData.customerName}</p>
                <p style="margin: 0 0 8px 0;"><strong>ელ-ფოსტა:</strong> <a href="mailto:${orderData.customerEmail}">${orderData.customerEmail}</a></p>
                <p style="margin: 0;"><strong>ტელეფონი:</strong> <a href="tel:${orderData.customerPhone}">${orderData.customerPhone}</a></p>
              </div>
            </div>

            <!-- Order Details -->
            <div style="margin-bottom: 25px;">
              <h3 style="color: #e74c3c; margin-bottom: 15px;">📋 შეკვეთის დეტალები</h3>
              <table style="width: 100%; margin-bottom: 15px; background-color: #f8f9fa; padding: 15px; border-radius: 5px;">
                <tr>
                  <td style="padding: 5px 0; font-weight: bold;">შეკვეთის ნომერი:</td>
                  <td style="padding: 5px 0; color: #e74c3c; font-weight: bold;">#${orderData.orderId}</td>
                </tr>
                <tr>
                  <td style="padding: 5px 0; font-weight: bold;">თარიღი:</td>
                  <td style="padding: 5px 0;">${orderData.orderDate}</td>
                </tr>
                <tr>
                  <td style="padding: 5px 0; font-weight: bold;">გადახდის მეთოდი:</td>
                  <td style="padding: 5px 0;">${orderData.paymentMethod}</td>
                </tr>
              </table>
            </div>

            <!-- Items -->
            <div style="margin-bottom: 25px;">
              <h3 style="color: #e74c3c; margin-bottom: 15px;">🛒 შეკვეთილი პროდუქტები</h3>
              <table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd;">
                <thead>
                  <tr style="background-color: #e74c3c; color: white;">
                    <th style="padding: 10px; text-align: left;">პროდუქტი</th>
                    <th style="padding: 10px; text-align: center;">რაოდენობა</th>
                    <th style="padding: 10px; text-align: right;">ფასი</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
                <tfoot>
                  <tr style="background-color: #28a745; color: white; font-weight: bold;">
                    <td colspan="2" style="padding: 12px; text-align: right;">სულ ჯამი:</td>
                    <td style="padding: 12px; text-align: right; font-size: 18px;">${orderData.totalAmount.toFixed(2)} ლარი</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <!-- Shipping Address -->
            <div style="margin-bottom: 25px;">
              <h3 style="color: #e74c3c; margin-bottom: 15px;">🚚 მიწოდების მისამართი</h3>
              <div style="background-color: #e8f5e8; padding: 15px; border-radius: 5px; border-left: 4px solid #28a745;">
                <p style="margin: 0 0 5px 0;"><strong>${orderData.shippingAddress.firstName} ${orderData.shippingAddress.lastName}</strong></p>
                <p style="margin: 0 0 5px 0;">${orderData.shippingAddress.address}</p>
                <p style="margin: 0 0 5px 0;">${orderData.shippingAddress.city}${orderData.shippingAddress.postalCode ? `, ${orderData.shippingAddress.postalCode}` : ''}</p>
                <p style="margin: 0;">📞 ${orderData.shippingAddress.phoneNumber}</p>
              </div>
            </div>

            <!-- Action Required -->
            <div style="background-color: #f8d7da; border-left: 4px solid #dc3545; padding: 20px; border-radius: 5px; text-align: center;">
              <h3 style="color: #721c24; margin: 0 0 10px 0;">⚠️ მოქმედება საჭიროა</h3>
              <p style="margin: 0 0 15px 0; color: #721c24;">გთხოვთ დაუყოვნებლივ დაამუშავოთ ეს შეკვეთა</p>
              <p style="margin: 0; color: #721c24; font-weight: bold;">შეკვეთა: #${orderData.orderId}</p>
            </div>

          </div>
        </body>
        </html>
      `,
      };

      await this.transporter.sendMail(mailOptions);
      console.log('✅ ADMIN EMAIL SENT SUCCESSFULLY!');
    } catch (error) {
      console.error('❌ ERROR SENDING ADMIN EMAIL:', error);
      throw error;
    }
  }
}
