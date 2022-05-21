import { IsString } from 'class-validator';

export class AddMemberToFamilyDto {
  @IsString()
  userId: string;
}
