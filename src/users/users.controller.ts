import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './DTO/user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  createUser(@Body() newUser: CreateUserDto) {
    return this.usersService.createUser(newUser);
  }
}
