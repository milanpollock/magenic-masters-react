import { HttpModule, Module } from '@nestjs/common';

import {
  AzureStorageProvider,
  ExifImageProvider,
} from '@dark-rush-photography/serverless/data';
import { ExifImageController } from './exif-image.controller';
import { ExifImageService } from './exif-image.service';

@Module({
  imports: [HttpModule],
  controllers: [ExifImageController],
  providers: [ExifImageService, ExifImageProvider, AzureStorageProvider],
})
export class ExifImageModule {}