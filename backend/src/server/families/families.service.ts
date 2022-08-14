import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { ChatService } from 'src/server/chat/chat.service';
import { UsersService } from 'src/server/users/users.service';
import { CreateFamilyDto } from './dtos/create-family.dto';

@Injectable()
export class FamiliesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly chatService: ChatService,
  ) {}

  async createFamily(createFamilyDto: CreateFamilyDto, userId: string) {
    const family = await this.prisma.family.create({
      data: {
        ...createFamilyDto,
        members: { connect: [{ id: userId }] },
      },
    });

    if (family) {
      await this.usersService.makeUserFamilyAdmin(userId);
      await this.chatService.createChatroom({
        name: `${family.name} chatroom`,
        familyId: family.id,
        userId: userId,
      });
    }

    return family;
  }

  async addUserToFamily(userId: string, familyId: string) {
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

    if (user.familyId) {
      throw new Error(`User with ID ${userId} is already in a family`);
    }

    const updatedFamily = await this.prisma.family.update({
      where: {
        id: familyId,
      },
      data: {
        members: { connect: [{ id: userId }] },
      },
    });

    if (!updatedFamily) {
      throw new Error(`No family found with ID ${familyId}`);
    }

    return updatedFamily;
  }
}
