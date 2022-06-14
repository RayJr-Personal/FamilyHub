import { IsString } from 'class-validator';

export class CreateCalendarDto {
  @IsString()
  name: string;

  @IsString()
  startDate: string;

  @IsString()
  endDate: string;
}
