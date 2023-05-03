import { Injectable } from '@nestjs/common';
import { RegisterAuthDto, LoginAuthDto } from './DTO/auth.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private authRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerAuthDto: RegisterAuthDto) {
    const { password } = registerAuthDto; //contraseña plana
    const plainToHash = await hash(password, 10); //contraseña encriptada
    //registro el usuario en la bases de datos
    const data = this.authRepository.create({
      ...registerAuthDto,
      password: plainToHash,
    });
    await this.authRepository.save(data);
    return { code: 201, message: 'Usuario creado correctamente', data };
  }

  async login(loginAuthDto: LoginAuthDto) {
    //busco el usuario en la base de datos
    const findUSer = await this.authRepository.findOne({
      where: { username: loginAuthDto.username },
    });
    //si no lo encuentro retorno un error
    if (!findUSer) {
      return { code: 404, message: 'Usuario no encontrado' };
    } else {
      //si lo encuentro comparo las contraseñas
      const isMatch = await compare(loginAuthDto.password, findUSer.password);
      //si no coinciden retorno un error
      if (!isMatch) {
        return { code: 400, message: 'Contraseña incorrecta' };
      }
      //si coinciden retorno el token y el usuario
      const { password, ...rest } = findUSer; //quito la contraseña del objeto
      const payload = { username: findUSer.username };
      const token = await this.jwtService.signAsync(payload);
      const data = {
        rest,
        token,
      };
      return { code: 200, data };
    }
  }
}
