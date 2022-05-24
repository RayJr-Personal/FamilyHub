import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UsersService } from 'src/users/users.service';
import { CreateTodoDto } from './dtos/create-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
    private readonly todoService: TodoService,
  ) {}

  async createTodo(createTodoDto: CreateTodoDto) {
    return this.prisma.todo.create({
      data: {
        ...createTodoDto,
      },
    });
  }


  async getTodoForFamily(familyId: string) {
    return this.prisma.todo.findMany({
      where: {
        familyId,
      },
    });
  }

  async getTodoById(todoId: string) {

    if (!todoId) {
      throw new BadRequestException(`No todo found with ID ${todoId}`);
    }

    return this.prisma.todo.findUnique({
      where: {
        id: todoId,
      },
    });

  }



  async assignTodoToUser(todoId: string, userId: string, familyId: string) {
    
    const family = await this.prisma.family.findUnique({
      where: {
        id: familyId,
      },
    });

    if (!family) {
      throw new Error(`No family found with ID ${familyId}`);
    }


    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new Error(`No user found with ID ${userId}`);
    }
    

    const todo = await this.todoService.getTodoById(todoId);

    if (!todo) {
      throw new Error(`No todo found with ID ${todoId}`);
    }

    
    const updatedTodo = await this.prisma.todo.update({
      where: {
        id: todoId,
      },
      data: {
        assignedUser: userId,
      },
    });

    if (!updatedTodo) {
      throw new Error(`No todo found with ID ${todoId}`);
    }

    return updatedTodo;
  }
  
}
