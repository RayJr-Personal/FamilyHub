import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';

@Module({
  providers: [PrismaService, ChatGateway, ChatService],
})
export class ChatModule {}
