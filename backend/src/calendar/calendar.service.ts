import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CreateCalendarDto, UpdateCalendarDto } from './dto';

@Injectable()
export class CalendarService {
  constructor(private prisma: PrismaService) {}

  async getCalendar(familyId: string) {
    return await this.prisma.calendar.findFirst({
      where: {
        familyId,
      },
    });
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

    return await this.prisma.calendar.delete({
      where: {
        id: calendarId,
      },
    });
  }
}
