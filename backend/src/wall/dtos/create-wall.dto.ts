import { Family } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';

export class CreateWallDto {
  @IsString()
  @IsOptional()
  posts?: string[];

  @IsString()
  familyId: string;
}
