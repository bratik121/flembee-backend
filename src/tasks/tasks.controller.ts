import { Controller, Post, Body, Get } from '@nestjs/common';
import { createTaskDto } from './DTO/task.dto';
import { TasksService } from './tasks.service';

//post/tasks
@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Post()
  createTask(@Body() newTask: createTaskDto) {
    return this.taskService.createTask(newTask);
  }
  @Get()
  getAllTasks() {
    return this.taskService.getAllTask();
  }
}
