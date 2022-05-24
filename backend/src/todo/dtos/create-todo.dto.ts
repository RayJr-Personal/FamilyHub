import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  text: string;
  familyId: string;

  @IsString()
  @IsOptional()
  duedate: string;
  assignedUser: string;

  @IsBoolean()
  completed: boolean;
  
}
