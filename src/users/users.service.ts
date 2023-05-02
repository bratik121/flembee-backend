import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './DTO/user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async createUser(user: CreateUserDto) {
    const newUser = await this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }
}
