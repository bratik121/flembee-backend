import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

@Entity({ name: 'tasks' })
class Task {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column({ default: TaskStatus.PENDING })
  status: TaskStatus;
  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

export { Task };
