import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDto } from '../../users/dto/user.dto';
export class RegisterAuthDto extends CreateUserDto {}

export class LoginAuthDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
