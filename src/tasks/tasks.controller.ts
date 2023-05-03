import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Delete,
  Patch,
  UsePipes,
  ValidationPipe,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { createTaskDto, taskByIdDto } from './DTO/task.dto';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

//post/tasks
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  createTask(@Body() newTask: createTaskDto) {
    return this.taskService.createTask(newTask);
  }
  @Get(':userId')
  getAllTasks(@Param('userId') userId: number) {
    return this.taskService.getAllTasks(userId);
  }
  @UsePipes(new ValidationPipe())
  @Patch('update/:id')
  updateTask(@Body() newTask: createTaskDto, @Param() id: taskByIdDto) {
    return this.taskService.updateTask(id.id, newTask);
  }

  @UsePipes(new ValidationPipe())
  @Delete('/:id')
  deleteTask(@Param() id: taskByIdDto) {
    return this.taskService.deleteTask(id.id);
  }

  @UsePipes(new ValidationPipe())
  @Patch('complete/:id')
  completeTask(@Param() id: taskByIdDto) {
    return this.taskService.completeTask(id.id);
  }
}
