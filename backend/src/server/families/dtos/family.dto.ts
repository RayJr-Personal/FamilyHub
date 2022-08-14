import { Expose } from 'class-transformer';

export class FamilyDto {
  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  image?: string;

  @Expose()
  members: string[];
}
