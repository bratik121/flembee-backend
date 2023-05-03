import { TaskStatus } from '../../entities/task.entity';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  IsIn,
  IsNumber,
} from 'class-validator';

export class createTaskDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  @MinLength(3)
  title: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  @IsNumber()
  userId: number;
  @IsIn([TaskStatus.PENDING, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  status: TaskStatus = TaskStatus.PENDING;
}

export class taskByIdDto {
  id: number;
}

// con ? ts identifica que es opcional
export class updateTaskDto {
  @IsOptional()
  title?: string;
  @IsOptional()
  description?: string;
  @IsOptional()
  @IsIn([TaskStatus.PENDING, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  status?: TaskStatus;
}
