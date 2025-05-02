import { IsEnum } from 'class-validator';
import { OrderStatus } from '../../../core/orders/entities/order.entity';

export class UpdateOrderStatusDto {
  @IsEnum(OrderStatus)
  status: OrderStatus;
}