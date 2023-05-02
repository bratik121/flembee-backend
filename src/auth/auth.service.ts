import { Injectable } from '@nestjs/common';
import { RegisterAuthDto, LoginAuthDto } from './DTO/auth.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { hash, compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private authRepository: Repository<User>,
  ) {}

  async register(registerAuthDto: RegisterAuthDto) {
    const { password } = registerAuthDto; //contraseña plana
    const plainToHash = await hash(password, 10); //contraseña encriptada
    return this.authRepository.save({
      ...registerAuthDto,
      password: plainToHash,
    });
  }

  async login(loginAuthDto: LoginAuthDto) {
    const findUSer = await this.authRepository.findOne({
      where: { username: loginAuthDto.username },
    });

    if (!findUSer) {
      return { code: 404, message: 'Usuario no encontrado' };
    } else {
      const isMatch = await compare(loginAuthDto.password, findUSer.password);
      if (!isMatch) {
        return { code: 400, message: 'Contraseña incorrecta' };
      }
      return { code: 200, message: 'Usuario logueado' };
    }
  }
}
