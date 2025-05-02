import { IsNotEmpty, IsNumber, Min, IsOptional, MaxLength, MinLength } from 'class-validator';

export class CreateMenuItemDto {
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(500)
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNotEmpty()
  @MaxLength(50)
  category: string;

  @IsNumber()
  restaurantId: number;

  @IsOptional()
  isAvailable: boolean = true;
}
