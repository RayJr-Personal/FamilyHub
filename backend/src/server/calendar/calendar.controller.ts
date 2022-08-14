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
import { AuthGuard } from 'src/server/guards/auth.guard';
import { CurrentUser } from 'src/server/users/decorators/current-user.decorator';
import { CalendarService } from './calendar.service';
import {
  CreateCalendarDto,
  CreateCalendarEventDto,
  UpdateCalendarDto,
  UpdateCalendarEventDto,
} from './dto';

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
  createCalendar(@Body() dto: CreateCalendarDto) {
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

  // CalendarEvent endpoints
  @Post('/createEvent')
  createCalendarEvent(
    @CurrentUser() user: User,
    @Body() dto: CreateCalendarEventDto,
  ) {
    return this.calendarService.createCalendarEvent(user, dto);
  }

  @Patch('/updateEvent/:id')
  updateCalendarEvent(
    @CurrentUser() user: User,
    @Body() dto: UpdateCalendarEventDto,
    @Param('id') calendarEventId: string,
  ) {
    return this.calendarService.updateCalendarEvent(user, dto, calendarEventId);
  }

  @Delete('/deleteEvent/:id')
  deleteCalendarEvent(
    @CurrentUser() user: User,
    @Param('id') calendarEventId: string,
  ) {
    return this.calendarService.deleteCalendarEvent(user, calendarEventId);
  }
}
