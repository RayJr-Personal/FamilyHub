import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  text: string;
  familyId: string;
  assignedUser: string;

  @IsString()
  @IsOptional()
  duedate: string;

  @IsBoolean()
  completed: boolean;
  
  userId: any;
}
