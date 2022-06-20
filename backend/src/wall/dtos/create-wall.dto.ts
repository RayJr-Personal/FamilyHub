import { IsOptional, IsString } from 'class-validator';

export class CreateWallDto {
  @IsString()
  @IsOptional()
  posts?: string[];

}
