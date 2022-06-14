import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { CalendarService } from './calendar.service';

@Controller('calendar')
export class CalendarController {
  constructor(private calendarService: CalendarService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getCalendar(@CurrentUser() user: User) {
    const userId = user.id;
    const familyId = user.familyId;

    return this.calendarService.getCalendar(userId, familyId);
  }
}
