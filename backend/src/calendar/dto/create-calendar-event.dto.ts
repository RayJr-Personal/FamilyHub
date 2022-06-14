import { IsString } from 'class-validator';

export class CreateCalendarEventDto {
  @IsString()
  name: string;

  @IsString()
  startDate: string;

  @IsString()
  endDate: string;
}
