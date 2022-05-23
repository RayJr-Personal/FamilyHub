import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateTodoDto } from './dtos/create-todo.dto';

@Injectable()
export class TodoService {
  constructor(private readonly prismaService: PrismaService) {}

  async createTodo(data: CreateTodoDto) {
    return this.prismaService.todo.create({
      data: {
        familyId: data.familyId,
        text: data.text,
        completed: data.completed,
        duedate: data.duedate,
      },
    });
  }


  async getTodoForFamily(familyId: string) {
    return this.prismaService.todo.findMany({
      where: {
        familyId,
      },
    });
  }

  
}
