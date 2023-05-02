import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // type of our database+
      host: 'localhost', // database host+
      port: 5432, // database host+
      username: 'postgres', // username+
      password: '12345678', // user password+
      database: 'taskmanagement', // name of our database+
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // entities (database table) we want to load+
      synchronize: true, // synchronize database schema with the schema in the entities+
    }),
  ],
})
export class DatabaseModule {}
