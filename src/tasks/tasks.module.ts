import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/entities/user.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Task, User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UsersModule,
    PassportModule,
  ],
  controllers: [TasksController],
  providers: [TasksService, JwtAuthGuard, UsersService],
})
export class TasksModule {}
