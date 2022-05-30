import { IsOptional, IsString } from 'class-validator';

export class CreateRecipeDto {
  @IsString()
  name: string;
  familyId: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  image?: string;
  
}
