import { TaskStatus } from '../../entities/task.entity';
import { IsNotEmpty, IsString, MinLength, IsOptional } from 'class-validator';
import { IsIn } from 'class-validator/types/decorator/decorators';

export class createTaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;
  description: string;
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
