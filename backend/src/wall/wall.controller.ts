import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthGuard } from 'src/guards/auth.guard';
//import { FamilyAdminGuard } from 'src/guards/family-admin.guard';
import { Serialize } from 'src/interceptors/serializer.interceptor';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { CurrentFamily } from './decorators/current-family.decorator';
import { CreateWallDto } from './dtos/create-wall.dto';
import { WallDto } from './dtos/wall.dto';
import { WallService } from './wall.service';

@Controller('wall')
@Serialize(WallDto)
@UseGuards(AuthGuard)
export class WallController {
  constructor(private readonly wallService: WallService) {}

  @Post()
  createWall(
    @Body() createWallDto: CreateWallDto,
    @CurrentUser() user: User,
  ) {
    console.log('user', user);
    return this.wallService.createWall(createWallDto, user.id);
  }

}
