import { Injectable, NotFoundException } from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';
import { Model } from 'mongoose';
import { concatMap, concatMapTo, from, map, Observable } from 'rxjs';

import { DocumentModel } from '../schema/document.schema';
import { Emotion, EmotionAddDto } from '@dark-rush-photography/shared/types';
import { validateEntityFound } from '../entities/entity-validation.functions';
import { validateAddEmotion } from '../content/emotion-validation.functions';
import { loadEmotion } from '../content/emotion.functions';

@Injectable()
export class EmotionProvider {
  add$(
    emotionAdd: EmotionAddDto,
    entityModel: Model<DocumentModel>
  ): Observable<Emotion> {
    const id = uuidv4();
    return from(entityModel.findById(emotionAdd.entityId)).pipe(
      map(validateEntityFound),
      concatMap((documentModel) => {
        const validatedDocumentModel = validateAddEmotion(
          emotionAdd,
          documentModel
        );
        return from(
          entityModel.findByIdAndUpdate(emotionAdd.entityId, {
            emotions: [
              ...validatedDocumentModel.emotions,
              {
                ...emotionAdd,
                id,
              },
            ],
          })
        );
      }),
      concatMapTo(this.findOne$(id, emotionAdd.entityId, entityModel))
    );
  }

  findOne$(
    id: string,
    entityId: string,
    entityModel: Model<DocumentModel>
  ): Observable<Emotion> {
    return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      map((documentModel) => {
        const foundEmotion = documentModel.emotions.find(
          (emotion) => emotion.id == id
        );
        if (!foundEmotion)
          throw new NotFoundException('Could not find emotion');

        return loadEmotion(foundEmotion);
      })
    );
  }

  remove$(
    id: string,
    entityId: string,
    entityModel: Model<DocumentModel>
  ): Observable<DocumentModel> {
    return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      concatMap((documentModel) =>
        from(
          entityModel.findByIdAndUpdate(entityId, {
            emotions: [
              ...documentModel.emotions.filter((emotion) => emotion.id !== id),
            ],
          })
        )
      ),
      map(validateEntityFound)
    );
  }
}
