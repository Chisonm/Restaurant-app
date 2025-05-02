import { IsNotEmpty, IsEnum, MaxLength } from 'class-validator';
import { PaymentType } from '../../../core/payments/entities/payment-method.entity';

export class CreatePaymentMethodDto {
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsEnum(PaymentType)
  type: PaymentType;

  @IsNotEmpty()
  @MaxLength(500)
  details: string;
}