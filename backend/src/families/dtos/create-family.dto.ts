import { IsOptional, IsString } from 'class-validator';

export class CreateFamilyDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  image?: string;

  @IsString()
  userId?: string;
}
