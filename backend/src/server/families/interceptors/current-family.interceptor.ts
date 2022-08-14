import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { UsersService } from 'src/server/users/users.service';

@Injectable()
export class CurrentFamilyInterceptor implements NestInterceptor {
  constructor(private readonly userService: UsersService) {}
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {};
    if (userId) {
      const user = await this.userService.findById(userId);
      request.currentFamily = user.familyId;
    }
    return next.handle();
  }
}
