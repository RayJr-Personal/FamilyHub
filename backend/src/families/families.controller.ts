import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthGuard } from 'src/guards/auth.guard';
import { FamilyAdminGuard } from 'src/guards/family-admin.guard';
import { Serialize } from 'src/interceptors/serializer.interceptor';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
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
    createFamilyDto.userId = user.id;
    return this.familiesService.createFamily(createFamilyDto);
  }

  @Post('add-user')
  @UseGuards(FamilyAdminGuard)
  addUserToFamily(
    @Body() createFamilyDto: CreateFamilyDto,
    @CurrentFamily() familyId: string,
  ) {
    return this.familiesService.addUserToFamily(
      createFamilyDto.userId,
      familyId,
    );
  }
}
