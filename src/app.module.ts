import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { TaskController } from './task/task.controller';

@Module({
  imports: [UsersModule, TasksModule],
  controllers: [AppController, TaskController],
  providers: [AppService],
})
export class AppModule {}
