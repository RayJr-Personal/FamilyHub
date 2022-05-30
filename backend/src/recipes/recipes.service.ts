import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UsersService } from 'src/users/users.service';
import { CreateRecipeDto } from './dtos/create-recipe.dto';

@Injectable()
export class RecipesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}


  async createRecipe(createRecipeDto: CreateRecipeDto, userId: string) {
    const recipe = await this.prisma.recipe.create({
      data: {
        ...createRecipeDto,
      },
    });

    return recipe;
  }


  async addRecipeToFamily(recipeId: string, familyId: string) {
    const recipe = await this.prisma.recipe.update({
      where: {
        id: recipeId,
      },
      data: {
        family: {
          connect: {
            id: familyId,
          },
        },
      },
    });

    if (!recipe) {
      throw new Error(`No recipe found with ID ${recipeId}`);
    }

    return recipe;
  }


  async deleteRecipe(recipeId: string) {
    const recipe = await this.prisma.recipe.delete({
      where: {
        id: recipeId,
      },
    });

    if (!recipe) {
      throw new Error(`No recipe found with ID ${recipeId}`);
    }

    return recipe;
  }


  async updateRecipe(recipeId: string, updateRecipeDto: CreateRecipeDto) {
    const recipe = await this.prisma.recipe.update({
      where: {
        id: recipeId,
      },
      data: {
        ...updateRecipeDto,
      },
    });

    if (!recipe) {
      throw new Error(`No recipe found with ID ${recipeId}`);
    }

    return recipe;
  }
}
