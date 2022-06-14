import { IsString } from 'class-validator';

export class CreateCalendarDto {
  @IsString()
  name: string;

  @IsString()
  familyId: string;
}
