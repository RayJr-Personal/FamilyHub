import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingUser) {
      throw new BadRequestException(`No user found with ID ${id}`);
    }

    return existingUser;
  }

  async makeUserFamilyAdmin(id: string) {
    const existingUser = await this.findById(id);

    if (!existingUser) {
      throw new BadRequestException(`No user found with ID ${id}`);
    }

    if (existingUser.isFamilyAdmin) {
      throw new BadRequestException(`User with ID ${id} is already an admin`);
    }

    return this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        isFamilyAdmin: true,
      },
    });
  }
}
