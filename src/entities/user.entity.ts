import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Task } from './task.entity';

@Entity({ name: 'users' })
class User {
  @PrimaryGeneratedColumn({})
  id: number;
  @Column({ unique: true })
  username: string;
  @Column()
  password: string;
  @Column()
  email: string;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
export { User };
