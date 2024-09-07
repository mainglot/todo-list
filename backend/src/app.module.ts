import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(process.env.MONGODB_PATH, {}),
    UsersModule,
    TodosModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'frontend', 'dist'),
    }),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
