import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UsersService } from 'src/users/users.service';
import { CreateFamilyDto } from './dtos/create-family.dto';

@Injectable()
export class FamiliesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  async createFamily(createFamilyDto: CreateFamilyDto) {
    const family = await this.prisma.family.create({
      data: {
        ...createFamilyDto,
        members: { connect: [{ id: createFamilyDto.userId }] },
      },
    });

    if (family) {
      await this.usersService.makeUserFamilyAdmin(createFamilyDto.userId);
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
