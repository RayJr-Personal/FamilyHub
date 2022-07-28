import { MiddlewareConsumer, Module } from '@nestjs/common';
import { WallService } from './wall.service';
import { WallController } from './wall.controller';
import { PrismaService } from 'nestjs-prisma';
import { UsersService } from 'src/users/users.service';
import { CurrentFamilyMiddleware } from './middlewares/current-family.middleware';
import { ChatService } from 'src/chat/chat.service';

@Module({
  providers: [PrismaService, WallService, UsersService, ChatService],
  controllers: [WallController],
})
export class WallModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentFamilyMiddleware).forRoutes('*');
  }
}
