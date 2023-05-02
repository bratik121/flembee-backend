import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { createTaskDto } from './DTO/task.dto';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

//post/tasks
@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Post()
  createTask(@Body() newTask: createTaskDto) {
    return this.taskService.createTask(newTask);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  getAllTasks() {
    return this.taskService.getAllTask();
  }
}
