import { IsNotEmpty, IsNumber, Min, IsOptional, MaxLength } from 'class-validator';

export class CreateOrderItemDto {
  @IsNumber()
  @IsNotEmpty()
  menuItemId: number;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsOptional()
  @MaxLength(255)
  specialInstructions?: string;
}