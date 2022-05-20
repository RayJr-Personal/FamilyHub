import { Body, Controller, Get, Post, Session } from '@nestjs/common';
import { User } from '@prisma/client';
import { Serialize } from 'src/interceptors/serializer.interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserDto } from './dtos/user.dto';

@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  @Get('whoami')
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Post('signup')
  async signUp(@Body() data: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signUp(data);
    session.userId = user.id;
    return user;
  }
}
