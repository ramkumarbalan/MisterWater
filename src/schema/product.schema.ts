import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Product {
  @Prop({ type: String })
  name: string;
}
