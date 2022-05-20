import { Injectable, NestMiddleware } from '@nestjs/common';
import { User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { UsersService } from '../users.service';

declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private readonly userService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.session || {};

    if (userId) {
      const user = await this.userService.findById(userId);
      req.currentUser = user;
    }
    next();
  }
}
