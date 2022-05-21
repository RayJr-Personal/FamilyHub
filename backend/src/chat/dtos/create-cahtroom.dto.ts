import { IsString } from 'class-validator';

export class CreateChatroomDto {
  @IsString()
  name: string;

  @IsString()
  familyId: string;

  @IsString()
  userId: string;
}
