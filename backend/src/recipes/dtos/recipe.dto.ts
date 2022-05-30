import { Expose } from 'class-transformer';

export class RecipeDto {
  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  image?: string;

  @Expose()
  family: string;

}
