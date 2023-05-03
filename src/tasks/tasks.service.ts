import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/entities/task.entity';
import { createTaskDto } from './DTO/task.dto';
import { Repository } from 'typeorm';
import { TaskStatus } from '../entities/task.entity';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    private userService: UsersService,
  ) {}
  //funcion que crea las tareas en la Bd
  async createTask(task: createTaskDto) {
    const findUser = await this.userService.getUser(task.userId);
    if (!findUser) {
      return { message: 'User not found', code: 404 };
    }
    const newTask = this.taskRepository.create(task);
    const data = await this.taskRepository.save(newTask);
    return {
      message: 'Task created successfully',
      code: 201,
      data: data,
    };
  }

  //funcion que busca una tarea por id
  async getAllTasks(userId: number) {
    console.log(userId);
    const findUser = await this.userService.getUser(userId);
    if (!findUser) {
      return { message: 'User not found', code: 404 };
    }
    console.log(userId, 'dsdsdsdsdsdsds');

    const tasks = await this.taskRepository.find({
      where: { userId: findUser.id },
      select: ['id', 'title', 'description', 'status', 'userId'],
      order: { id: 'ASC' },
    });
    return tasks;
  }

  async updateTask(id: number, updatedTask: createTaskDto) {
    const findUser = await this.userService.getUser(updatedTask.userId);
    if (!findUser) {
      return { message: 'User not found', code: 404 };
    }
    const updateTask = await this.taskRepository.findOne({ where: { id } });
    if (!updateTask) {
      return { message: 'Task not found', code: 404 };
    }
    updateTask.title = updatedTask.title;
    updateTask.description = updatedTask.description;
    const data = await this.taskRepository.update(
      { id: updateTask.id },
      updatedTask,
    );
    return {
      message: 'Task updated successfully',
      code: 200,
      data: data,
    };
  }

  async deleteTask(id: number) {
    const deleteTask = await this.taskRepository.findOne({ where: { id } });
    if (!deleteTask) {
      return { message: 'Task not found', code: 404 };
    }
    const data = await this.taskRepository.delete(deleteTask);
    return {
      message: 'Task deleted successfully',
      code: 200,
      data: data,
    };
  }

  async completeTask(id: number) {
    const completeTask = await this.taskRepository.findOne({ where: { id } });
    if (!completeTask) {
      return { message: 'Task not found', code: 404 };
    }
    if (completeTask.status === TaskStatus.PENDING) {
      completeTask.status = TaskStatus.DONE;
    } else {
      return { message: 'Task already completed', code: 400 };
    }
    return this.taskRepository.save(completeTask);
  }
}
