import { MiddlewareConsumer, Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { PrismaService } from 'nestjs-prisma';
import { UsersService } from 'src/users/users.service';
import { CurrentFamilyMiddleware } from './middlewares/current-family.middleware';

@Module({
  providers: [PrismaService, RecipesService, UsersService],
  controllers: [RecipesController],
})
export class RecipesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentFamilyMiddleware).forRoutes('*');
  }
}
