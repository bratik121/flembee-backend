import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

@Entity({ name: 'task' })
class Task {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  descrition: string;
  @Column()
  status: TaskStatus;
  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

export { Task };
