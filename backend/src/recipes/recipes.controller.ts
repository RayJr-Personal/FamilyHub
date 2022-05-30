import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthGuard } from 'src/guards/auth.guard';
import { FamilyAdminGuard } from 'src/guards/family-admin.guard';
import { Serialize } from 'src/interceptors/serializer.interceptor';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { CurrentFamily } from './decorators/current-family.decorator';
import { CreateRecipeDto } from './dtos/create-recipe.dto';
import { RecipeDto } from './dtos/recipe.dto';
import { RecipesService } from './recipes.service';

@Controller('recipes')
@Serialize(RecipeDto)
@UseGuards(AuthGuard)
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  createRecipe(
    @Body() createRecipeDto: CreateRecipeDto,
    @CurrentUser() user: User,
  ) {
    console.log('user', user);
    return this.recipesService.createRecipe(createRecipeDto, user.id);
  }

}
