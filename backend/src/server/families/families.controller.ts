import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthGuard } from 'src/server/guards/auth.guard';
import { FamilyAdminGuard } from 'src/server/guards/family-admin.guard';
import { Serialize } from 'src/server/interceptors/serializer.interceptor';
import { CurrentUser } from 'src/server/users/decorators/current-user.decorator';
import { CurrentFamily } from './decorators/current-family.decorator';
import { CreateFamilyDto } from './dtos/create-family.dto';
import { FamilyDto } from './dtos/family.dto';
import { FamiliesService } from './families.service';

@Controller('families')
@Serialize(FamilyDto)
@UseGuards(AuthGuard)
export class FamiliesController {
  constructor(private readonly familiesService: FamiliesService) {}

  @Post()
  createFamily(
    @Body() createFamilyDto: CreateFamilyDto,
    @CurrentUser() user: User,
  ) {
    console.log('user', user);
    return this.familiesService.createFamily(createFamilyDto, user.id);
  }

  @Post('add-user')
  @UseGuards(FamilyAdminGuard)
  addUserToFamily(@Body() userId: string, @CurrentFamily() familyId: string) {
    return this.familiesService.addUserToFamily(userId, familyId);
  }
}
