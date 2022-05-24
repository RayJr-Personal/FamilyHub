import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serializer.interceptor';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { CurrentFamily } from './decorators/current-family.decorator';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { TodoDto } from './dtos/todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
@Serialize(TodoDto)
@UseGuards(AuthGuard)
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  createTodo(
    @Body() createTodoDto: CreateTodoDto,
    @CurrentUser() user: User,
    @CurrentFamily() familyId: string,
  ) {
    console.log('user', user);
    return this.todoService.createTodo(createTodoDto);
  }

}
