import { Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('msgToServer')
  async handleMessage(client: Socket, @MessageBody() payload: any) {
    const { userId, message, chatroomId } = payload;
    await this.chatService.saveMessage(message, userId, chatroomId);

    this.server.emit('msgToClient', payload);
  }

  afterInit(_server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  async handleConnection(client: Socket, ...args: any[]) {
    const messages = await this.chatService.getMessagesForRoom(
      client.request.headers.chatRoomId as string,
    );

    this.server.emit('msgsToClient', messages);
    this.logger.log(`Client connected: ${client.id}`);
  }
}
