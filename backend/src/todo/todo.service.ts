import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UsersService } from 'src/users/users.service';
import { CreateTodoDto } from './dtos/create-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    private readonly usersService: UsersService,
    private readonly prismaService: PrismaService,
    private readonly todoService: TodoService,
  ) {}

  async createTodo(createTodoDto: CreateTodoDto, userId: string) {
    const todo = await this.prismaService.todo.create({
      data: {
        ...createTodoDto,
        //assignedUser: { connect: { id: userId } },
      },
    });


    return todo;
  }


  async getTodoForFamily(familyId: string) {
    return this.prismaService.todo.findMany({
      where: {
        familyId,
      },
    });
  }

  async getTodoById(todoId: string) {

    if (!todoId) {
      throw new BadRequestException(`No todo found with ID ${todoId}`);
    }

    return this.prismaService.todo.findUnique({
      where: {
        id: todoId,
      },
    });

  }


  async assignTodoToUser(todoId: string, userId: string, familyId: string) {
    
    const family = await this.prismaService.family.findUnique({
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

    const updatedTodo = await this.prismaService.todo.update({
      where: {
        id: todoId,
      },
      data: {
        // can't get below line to work without errors :|
        //assignedUser: { connect: { id: userId } },
      },
    });

    if (!updatedTodo) {
      throw new Error(`No todo found with ID ${todoId}`);
    }

    return updatedTodo;
  }


  async deleteTodo(todoId: string) {
    const todo = await this.todoService.getTodoById(todoId);

    if (!todo) {
      throw new Error(`No todo found with ID ${todoId}`);
    }

    const deletedTodo = await this.prismaService.todo.delete({
      where: {
        id: todoId,
      },
    });

    if (!deletedTodo) {
      throw new Error(`No todo found with ID ${todoId}`);
    }

    return deletedTodo;
  }
}
