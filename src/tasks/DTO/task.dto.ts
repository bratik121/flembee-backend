import { TaskStatus } from '../../entities/task.entity';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  IsIn,
} from 'class-validator';

export class createTaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;
  description: string;
  status: TaskStatus = TaskStatus.PENDING;
}

export class taskByIdDto {
  id: string;
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
