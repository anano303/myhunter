import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StockSubscriptionDocument = HydratedDocument<StockSubscription>;

@Schema({ timestamps: true })
export class StockSubscription {
  @Prop({ required: true })
  email!: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product',
  })
  productId!: mongoose.Types.ObjectId;

  @Prop({ required: false })
  variantSize?: string;

  @Prop({ required: false })
  variantColor?: string;

  @Prop({ required: false })
  variantAgeGroup?: string;

  @Prop({ default: false })
  notified!: boolean;
}

export const StockSubscriptionSchema =
  SchemaFactory.createForClass(StockSubscription);

StockSubscriptionSchema.index(
  { email: 1, productId: 1, variantSize: 1, variantColor: 1, variantAgeGroup: 1 },
  { unique: true, background: true },
);
StockSubscriptionSchema.index({ productId: 1, notified: 1 }, { background: true });
