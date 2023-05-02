import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Task } from '../entities/task.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // type of our database+
      host: 'localhost', // database host+
      port: 5432, // database host+
      username: 'postgres', // username+
      password: '12345678', // user password+
      database: 'flembeeDB', // name of our database+
      entities: [User, Task], // entities (database table) we want to load+
      synchronize: true, // synchronize database schema with the schema in the entities
    }),
  ],
})
export class DatabaseModule {}
