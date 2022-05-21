import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadService } from './upload/upload.service';

@Injectable()
export class AppService {
  constructor(private readonly uploadService: UploadService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async uploadImage(file: Express.Multer.File) {
    return await this.uploadService.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
  }
}
