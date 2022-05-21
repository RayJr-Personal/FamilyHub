import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateChatroomDto } from './dtos/create-cahtroom.dto';

@Injectable()
export class ChatService {
  constructor(private readonly prismaService: PrismaService) {}

  async createChatroom(data: CreateChatroomDto) {
    return this.prismaService.chatroom.create({
      data: {
        name: data.name,
        familyId: data.familyId,
        members: { connect: [{ id: data.userId }] },
      },
    });
  }

  async addUserToChatroom(
    userId: string,
    chatroomId: string,
    familyId: string,
  ) {
    const existingUser = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!existingUser) {
      throw new BadRequestException(`No user found with ID ${userId}`);
    }

    if (existingUser.chatRoomId) {
      throw new BadRequestException(
        `User with ID ${userId} is already in a chatroom`,
      );
    }

    const existingFamily = await this.prismaService.family.findUnique({
      where: {
        id: familyId,
      },
    });

    if (!existingFamily) {
      throw new BadRequestException(`No family found with ID ${familyId}`);
    }

    const updatedUser = await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        chatRoomId: chatroomId,
      },
    });

    if (updatedUser) {
      const updatedChatroom = await this.prismaService.chatroom.update({
        where: {
          id: chatroomId,
        },
        data: {
          members: { connect: [{ id: userId }] },
        },
      });

      if (updatedChatroom) {
        return updatedChatroom;
      }
    }
  }

  async saveMessage(message: string, userId: string, chatroomId: string) {
    return this.prismaService.chatMessage.create({
      data: {
        message,
        user: { connect: { id: userId } },
        chatroom: { connect: { id: chatroomId } },
      },
    });
  }

  async getMessagesForRoom(chatroomId: string) {
    return this.prismaService.chatMessage.findMany({
      where: {
        chatroomId,
      },
    });
  }
}
