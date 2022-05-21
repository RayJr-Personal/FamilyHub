import { IsOptional, IsString } from 'class-validator';

export class CreateFamilyDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  image?: string;
}
