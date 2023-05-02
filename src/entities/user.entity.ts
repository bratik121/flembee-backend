import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
export { User };
