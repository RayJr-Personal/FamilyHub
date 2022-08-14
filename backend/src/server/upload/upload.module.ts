import { Module } from '@nestjs/common';
import { UploadProvider } from './upload.provider';
import { UploadService } from './upload.service';

@Module({
  providers: [UploadProvider, UploadService],
  exports: [UploadProvider, UploadService],
})
export class UploadModule {}
