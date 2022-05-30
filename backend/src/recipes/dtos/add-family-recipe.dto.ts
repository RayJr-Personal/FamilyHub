import { IsString } from 'class-validator';

export class AddRecipeToFamilyDto {
  @IsString()
  userId: string;
}
