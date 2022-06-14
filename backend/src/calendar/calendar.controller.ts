import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { CalendarService } from './calendar.service';
import { CreateCalendarDto, UpdateCalendarDto } from './dto';

@Controller('calendar')
export class CalendarController {
  constructor(private calendarService: CalendarService) {}

  @Get()
  @UseGuards(AuthGuard)
  getCalendar(@CurrentUser() user: User) {
    const familyId = user.familyId;

    return this.calendarService.getCalendar(familyId);
  }

  @Post()
  makeCalendar(@Body() dto: CreateCalendarDto) {
    return this.calendarService.createCalendar(dto);
  }

  @Patch(':id')
  updateCalendar(
    @CurrentUser() user: User,
    @Body() dto: UpdateCalendarDto,
    @Param('id') calendarId: string,
  ) {
    return this.calendarService.updateCalendar(user, calendarId, dto);
  }

  @Delete(':id')
  deleteCalendar(@CurrentUser() user: User, @Param('id') calendarId: string) {
    return this.calendarService.deleteCalendar(user, calendarId);
  }
}
