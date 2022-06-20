import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UsersService } from 'src/users/users.service';
import { CreateWallDto } from './dtos/create-wall.dto';

@Injectable()
export class WallService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService
  ) {}

  async createWall(createWallDto: CreateWallDto, userId: string) {
    const wall = await this.prisma.wall.create({
      data: {
        ...createWallDto
      },
    });

    return wall;
  }


}
