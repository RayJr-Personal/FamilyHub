import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serializer.interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { SignInUserDto } from './dtos/signin-user.dto';
import { UserDto } from './dtos/user.dto';

@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  @Get('whoami')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Post('signup')
  async signUp(@Body() data: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signUp(data);
    console.log('user', user);
    session.userId = user.id;
    return user;
  }

  @Post('signin')
  async signIn(@Body() data: SignInUserDto, @Session() session: any) {
    const user = await this.authService.signIn(data);
    session.userId = user.id;
    return user;
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
    return 'ok';
  }
}
