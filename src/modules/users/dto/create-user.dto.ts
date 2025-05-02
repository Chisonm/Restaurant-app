import { IsEmail, IsNotEmpty, IsEnum, MinLength, MaxLength, Matches } from 'class-validator';
import { UserRole, Region } from '../../../core/users/entities/user.entity';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(50)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number or special character',
  })
  password: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsEnum(Region)
  region: Region;
}