import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import {
  CreateCalendarDto,
  CreateCalendarEventDto,
  UpdateCalendarDto,
  UpdateCalendarEventDto,
} from './dto';

@Injectable()
export class CalendarService {
  constructor(private prisma: PrismaService) {}

  async getCalendar(familyId: string) {
    const calendar = await this.prisma.calendar.findFirst({
      where: {
        familyId,
      },
    });
    const events = await this.prisma.calendarEvent.findMany({
      where: {
        calendarId: calendar.id,
      },
    });
    return { ...calendar, events };
  }

  async createCalendar(dto: CreateCalendarDto) {
    return await this.prisma.calendar.create({
      data: {
        ...dto,
      },
    });
  }

  async updateCalendar(
    currentUser: User,
    calendarId: string,
    dto: UpdateCalendarDto,
  ) {
    const calendar = await this.prisma.calendar.findUnique({
      where: {
        id: calendarId,
      },
    });

    // check if current user and requested calendar has the same family
    if (!calendar || calendar.familyId != currentUser.familyId) {
      throw new ForbiddenException('Error updating calendar');
    }

    return await this.prisma.calendar.update({
      where: {
        id: calendarId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteCalendar(currentUser: User, calendarId: string) {
    const calendar = await this.prisma.calendar.findUnique({
      where: {
        id: calendarId,
      },
    });

    // check if current user and requested calendar has the same family
    if (!calendar || calendar.familyId != currentUser.familyId) {
      throw new ForbiddenException('Error updating calendar');
    }

    // add later: check if user has permission to do this
    // maybe too complicated, adding roles?

    await this.prisma.calendar.delete({
      where: {
        id: calendarId,
      },
    });
  }

  // CalendarEvent
  async createCalendarEvent(currentUser: User, dto: CreateCalendarEventDto) {
    // Get calendar
    const calendar = await this.prisma.calendar.findUnique({
      where: {
        id: dto.calendarId,
      },
    });

    // Check if calendar is in the same family as current user
    if (!calendar || calendar.familyId != currentUser.familyId) {
      throw new ForbiddenException('Error creating calendar event');
    }

    const isActive = dto.isActive === '1';

    const newEvent = { ...dto, calendarId: calendar.id, isActive };

    return await this.prisma.calendarEvent.create({
      data: {
        ...newEvent,
      },
    });
  }

  async updateCalendarEvent(
    user: User,
    dto: UpdateCalendarEventDto,
    calendarEventId: string,
  ) {
    const event = await this.prisma.calendarEvent.findFirst({
      where: {
        id: calendarEventId,
      },
    });

    // Event not found
    if (!event) {
      throw new NotFoundException('Event not found');
    }

    const calendar = await this.prisma.calendar.findUnique({
      where: {
        id: dto.calendarId,
      },
    });

    // Event is not assigned to user's family
    if (user.familyId != calendar.familyId) {
      throw new ForbiddenException(
        'Unable to update event - event not assinged to your family',
      );
    }

    // Convert string to boolean
    const isActive = dto.isActive === '1';
    const newEvent = { ...dto, isActive };

    await this.prisma.calendarEvent.update({
      where: {
        id: calendarEventId,
      },
      data: {
        ...newEvent,
      },
    });
  }

  async deleteCalendarEvent(user: User, calendarEventId: string) {
    const event = await this.prisma.calendarEvent.findFirst({
      where: {
        id: calendarEventId,
      },
    });
    const calendar = await this.prisma.calendar.findFirst({
      where: {
        id: event.calendarId,
      },
    });

    // Event not found
    if (!event) {
      throw new NotFoundException('Event not found');
    }

    // Event is not assigned to user's family
    if (user.familyId != calendar.familyId) {
      throw new ForbiddenException(
        'Unable to delete event - event not assinged to your family',
      );
    }

    await this.prisma.calendarEvent.delete({
      where: {
        id: calendarEventId,
      },
    });
  }
}
