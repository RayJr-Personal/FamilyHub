import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  text: string;
  familyId: string;

  @IsString()
  @IsOptional()
  duedate: string;

  @IsBoolean()
  completed: boolean;

  assignedUser: string;
  
}
