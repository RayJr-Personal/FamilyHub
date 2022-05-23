import { Expose } from 'class-transformer';

export class TodoDto {
  @Expose()
  text: string;

  @Expose()
  duedate: string;

  @Expose()
  familyId: string;
}
