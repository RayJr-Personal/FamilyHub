import { IsOptional, IsString } from 'class-validator';

export class UpdateCalendarDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  familyId?: string;
}
