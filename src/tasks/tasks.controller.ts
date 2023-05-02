import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Delete,
  Patch,
} from '@nestjs/common';
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

  @Patch('update/:id')
  updateTask(@Body() newTask: createTaskDto, id: number) {
    return this.taskService.updateTask(id, newTask);
  }

  @Delete('/:id')
  deleteTask(id: number) {
    return this.taskService.deleteTask(id);
  }

  @Patch('complete/:id')
  completeTask(id: number) {
    return this.taskService.completeTask(id);
  }
}
