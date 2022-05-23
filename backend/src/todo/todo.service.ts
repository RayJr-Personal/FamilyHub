import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateTodoDto } from './dtos/create-todo.dto';

@Injectable()
export class TodoService {
  constructor(private readonly prismaService: PrismaService) {}

  async createTodo(data: CreateTodoDto, familyId: string) {


    return this.prismaService.todo.create({
      data: {
        text: data.text,
        duedate: data.duedate,
        familyId: data.familyId,
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
