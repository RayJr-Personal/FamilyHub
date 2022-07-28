import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UsersService } from 'src/users/users.service';
import { CreateWallDto } from './dtos/create-wall.dto';


@Injectable()
export class WallService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  async createWall(createWallDto: CreateWallDto, familyId: string) {
    const wall = await this.prisma.wall.create({
      data: {
        ...createWallDto,
        familyId: familyId,
      },
    });

    return wall;
  }


  async getWallPosts(wallId: string) {
    const wall = await this.prisma.wall.findUnique({
      where: {
        id: wallId,
      },
    });

    return wall;
  }


  async createWallPost(wallId: string, userId: string, content: string, image: string) {
    const wall = await this.prisma.wall.findUnique({
      where: {
        id: wallId,
      },
    });

    if (!wall) {
      throw new Error(`No wall found with ID ${wallId}`);
    }


    const user = await this.usersService.findById(userId);
    
    if (!user) {
      throw new Error(`No user found with ID ${userId}`);
    }


    const wallPost = await this.prisma.wallPost.create({
      data: {
        message: content,
        wall: {
          connect: {
            id: wallId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return wallPost;
    
  }

  async deleteWallPost(wallPostId: string) {
    const wallPost = await this.prisma.wallPost.delete({
      where: {
        id: wallPostId,
      },
    });

    return wallPost;
  }
  
  
  async updateWallPost(wallPostId: string, updatedContent: string, userId: string) {
    const wallPost = await this.prisma.wallPost.update({
      where: {
        id: wallPostId,
      },
      data: {
        message: updatedContent,
      },
    });

    if (!wallPost) {
      throw new Error(`No wall post found with ID ${wallPostId}`);
    }

    const user = await this.usersService.findById(userId);
    
    if (!user) {
      throw new Error(`No user found with ID ${userId}`);
    }

    await this.prisma.wallPost.update({
      where: {
        id: wallPostId,
      },
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return wallPost;
  }
}
