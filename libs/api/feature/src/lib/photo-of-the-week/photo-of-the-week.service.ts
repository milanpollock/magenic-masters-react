import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { PhotoOfTheWeek } from '@dark-rush-photography/shared-types';
import {
  DocumentModel,
  Document,
} from '@dark-rush-photography/shared-server/data';

@Injectable()
export class PhotoOfTheWeekService {
  constructor(
    @InjectModel(Document.name)
    private readonly photoOfTheWeekModel: Model<DocumentModel>
  ) {}

  async getWeeklyPhotosAsync(): Promise<PhotoOfTheWeek[]> {
    return await this.photoOfTheWeekModel
      .find({ type: 'PhotoOfTheWeek' })
      .exec();
  }

  async getPhotoOfTheWeekAsync(id: string): Promise<PhotoOfTheWeek> {
    const photoOfTheWeek = await this.photoOfTheWeekModel.findById(id);
    if (!photoOfTheWeek) {
      throw new NotFoundException('Could not find photo of the week');
    }
    return photoOfTheWeek;
  }

  async addPhotoOfTheWeekAsync(
    photoOfTheWeek: PhotoOfTheWeek
  ): Promise<string> {
    const addedPhotoOfTheWeek = await new this.photoOfTheWeekModel(
      photoOfTheWeek
    ).save();
    return addedPhotoOfTheWeek.slug;
  }

  async updatePhotoOfTheWeekAsync(
    id: string,
    photoOfTheWeek: PhotoOfTheWeek
  ): Promise<string> {
    const foundPhotoOfTheWeek = await this.photoOfTheWeekModel.findById(id);
    if (!foundPhotoOfTheWeek) {
      throw new NotFoundException('Could not find photo of the week');
    }
    await this.photoOfTheWeekModel.findByIdAndUpdate(id, photoOfTheWeek);
    foundPhotoOfTheWeek?.save();
    return id;
  }

  async deletePhotoOfTheWeekAsync(id: string): Promise<void> {
    await this.photoOfTheWeekModel.findByIdAndDelete(id);
  }
}