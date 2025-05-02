import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateRestaurantDto {
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(500)
  description: string;

  @IsNotEmpty()
  @MaxLength(50)
  cuisine: string;

  @IsNotEmpty()
  @MaxLength(100)
  location: string;
}