import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCalendarEventDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  startDate?: string;

  @IsString()
  @IsOptional()
  endDate?: string;

  @IsString()
  @IsOptional()
  isActive?: string;

  @IsString()
  calendarId: string;
}
