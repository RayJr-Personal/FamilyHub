import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class CalendarService {
  constructor(private prisma: PrismaService) {}

  async getCalendar(userId: string, familyId: string) {
    return await this.prisma.calendar.findFirst({
      where: {
        familyId,
      },
    });
  }
}
