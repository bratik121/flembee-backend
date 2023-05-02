import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/entities/task.entity';
import { createTaskDto } from './DTO/task.dto';
import { Repository } from 'typeorm';
import { TaskStatus } from '../entities/task.entity';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}
  async createTask(task: createTaskDto) {
    const newTask = this.taskRepository.create(task);
    return this.taskRepository.save(newTask);
  }
  async getAllTask() {
    return this.taskRepository.find();
  }

  async updateTask(id: number, updatedTask: createTaskDto) {
    const updateTask = await this.taskRepository.findOne({ where: { id } });
    updateTask.title = updatedTask.title;
    updateTask.description = updatedTask.description;
    return this.taskRepository.save(updatedTask);
  }

  async deleteTask(id: number) {
    const deleteTask = await this.taskRepository.findOne({ where: { id } });
    return this.taskRepository.remove(deleteTask);
  }

  async completeTask(id: number) {
    const completeTask = await this.taskRepository.findOne({ where: { id } });
    completeTask.status = TaskStatus.DONE;
    return this.taskRepository.save(completeTask);
  }
}
