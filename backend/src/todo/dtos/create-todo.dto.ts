import { IsOptional, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  text: string;

  @IsString()
  duedate: string;

  @IsString()
  familyId: string;

}
