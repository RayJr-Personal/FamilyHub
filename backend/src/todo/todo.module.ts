import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { TodoService } from './todo.service';

@Module({
  providers: [PrismaService, TodoService],
})
export class TodoModule {}
