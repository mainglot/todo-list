import { Module } from '@nestjs/common';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import * as AutoIncrementFactory from 'mongoose-sequence';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { Todos, TodosSchema } from './schemas/todos.schema';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{
      name: Todos.name,
      schema: TodosSchema,
    }]),
    MongooseModule.forFeatureAsync([
      {
        name: Todos.name,
        useFactory: async (connection: Connection) => {
          const schema = TodosSchema;
          const AutoIncrement = AutoIncrementFactory(connection);
          schema.plugin(AutoIncrement, {inc_field: 'id'});
          return schema;
        },
        inject: [getConnectionToken()],
      },
    ]),
  ],
  controllers: [TodosController],
  providers: [TodosService]
})
export class TodosModule {}
