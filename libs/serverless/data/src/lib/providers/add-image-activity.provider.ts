﻿import * as fs from 'fs-extra';
import { HttpService, Injectable, Logger } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { ImageDimensionState } from '@dark-rush-photography/shared-types';
import { AzureStorageContainerType } from '@dark-rush-photography/shared-server/types';
import {
  Env,
  ImageActivity,
  PublishedImage,
} from '@dark-rush-photography/serverless/types';
import {
  downloadAzureStorageBlobToFile$,
  uploadStreamToAzureStorageBlob$,
} from '@dark-rush-photography/shared-server/util';
import {
  getBlobPath,
  readCreateDateExif$,
} from '@dark-rush-photography/serverless/util';
import { apiAddImage$ } from '../api-gateway/image-api-gateway.functions';

@Injectable()
export class AddImageActivityProvider {
  readonly logContext = 'AddImageActivityProvider';

  addImage$(
    env: Env,
    httpService: HttpService,
    imageActivity: ImageActivity
  ): Observable<void> {
    const { state, publishedImage } = imageActivity;
    return downloadAzureStorageBlobToFile$(
      env.azureStorageConnectionString,
      AzureStorageContainerType.Private,
      getBlobPath(state, publishedImage),
      publishedImage.imageName
    ).pipe(
      tap(() =>
        Logger.log(`Adding image for ${publishedImage.slug}`, this.logContext)
      ),
      switchMap((imageFilePath) =>
        this.addImageWithPath$(env, httpService, publishedImage, imageFilePath)
      )
    );
  }

  addImageWithPath$(
    env: Env,
    httpService: HttpService,
    publishedImage: PublishedImage,
    imageFilePath: string
  ): Observable<void> {
    return uploadStreamToAzureStorageBlob$(
      fs.createReadStream(imageFilePath),
      env.azureStorageConnectionString,
      AzureStorageContainerType.Private,
      getBlobPath(ImageDimensionState.Added, publishedImage)
    ).pipe(
      switchMap(() => readCreateDateExif$(imageFilePath)),
      switchMap((createDate) =>
        apiAddImage$(env, httpService, publishedImage, createDate)
      ),
      map(() => Logger.log('AddImage complete', this.logContext))
    );
  }
}