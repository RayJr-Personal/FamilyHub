import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  text: string;
  duedate: string;
  familyId: string;
  assignedUser: string;

  @IsBoolean()
  completed: boolean;
  
  userId: any;
}
