import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  email?: string;

  @Expose()
  username: string;

  @Expose()
  familyId: string;

  @Expose()
  chatRoomId: string;
}
