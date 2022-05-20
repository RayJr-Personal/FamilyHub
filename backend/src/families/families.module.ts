import { MiddlewareConsumer, Module } from '@nestjs/common';
import { FamiliesService } from './families.service';
import { FamiliesController } from './families.controller';
import { PrismaService } from 'nestjs-prisma';
import { UsersService } from 'src/users/users.service';
import { CurrentFamilyMiddleware } from './middlewares/current-family.middleware';

@Module({
  providers: [PrismaService, FamiliesService, UsersService],
  controllers: [FamiliesController],
})
export class FamiliesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentFamilyMiddleware).forRoutes('*');
  }
}
