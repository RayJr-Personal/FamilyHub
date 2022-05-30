import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UsersService } from 'src/users/users.service';

declare global {
  namespace Express {
    interface Request {
      currentFamily?: string;
    }
  }
}

@Injectable()
export class CurrentFamilyMiddleware implements NestMiddleware {
  constructor(private readonly userService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.session || {};

    if (userId) {
      const user = await this.userService.findById(userId);
      req.currentFamily = user.familyId;
    }
    next();
  }
}
