import { Expose } from 'class-transformer';

export class WallDto {
  @Expose()
  posts: string[];
}
