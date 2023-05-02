import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/config/db.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User]), DatabaseModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
