import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/entities/task.entity';
import { createTaskDto } from './DTO/task.dto';
import { Repository } from 'typeorm';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}
  createTask(task: createTaskDto) {
    const newTask = this.taskRepository.create(task);
    return this.taskRepository.save(newTask);
  }
}
