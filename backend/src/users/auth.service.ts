import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateUserDto } from './dtos/create-user.dto';
import * as argon2 from 'argon2';
import { SignInUserDto } from './dtos/signin-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async signUp(data: CreateUserDto) {
    const hashedPassword = await argon2.hash(data.password);
    return this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }

  async signIn(@Body() data: SignInUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        username: data.username,
      },
    });

    if (!existingUser) {
      throw new BadRequestException('Invalid Credentials');
    }

    const isValidPassword = await argon2.verify(
      existingUser.password,
      data.password,
    );

    if (!isValidPassword) {
      throw new BadRequestException('Invalid Credentials');
    }

    return existingUser;
  }
}
