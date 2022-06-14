import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { PrismaModule } from 'nestjs-prisma';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { FamiliesModule } from './families/families.module';
import { ChatModule } from './chat/chat.module';
import { UploadModule } from './upload/upload.module';
// import { TodoModule } from './todo/todo.module';
import { CalendarService } from './calendar/calendar.service';
import { CalendarController } from './calendar/calendar.controller';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require('cookie-session');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        prismaOptions: { log: ['info'] },
        explicitConnect: true,
      },
    }),
    UsersModule,
    FamiliesModule,
    ChatModule,
    TodoModule,
    UploadModule,
  ],
  controllers: [AppController, CalendarController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
    CalendarService,
  ],
})
export class AppModule {
  constructor(private readonly configService: ConfigService) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: [this.configService.get('SESSION_SECRET')],
        }),
      )
      .forRoutes('*');
  }
}
