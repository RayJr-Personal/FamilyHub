import { Expose } from 'class-transformer';

export class TodoDto {
  @Expose()
  text: string;
  duedate: string;
  familyId: string;
  assignedUser: string;
  completed: boolean;

}
