import 'reflect-metadata';

import {
  EntityType,
  MediaProcessType,
} from '@dark-rush-photography/shared/types';
import { getMediaProcessTypeFromEntityType } from './entity-to-media-process-type.functions';

describe('entity-to-media-process-type.functions', () => {
  describe('getMediaProcessTypeFromEntityType', () => {
    it('should return image video', () => {
      const result = getMediaProcessTypeFromEntityType(
        EntityType.MediaProcessImageVideo
      );
      expect(result).toBe(MediaProcessType.ImageVideo);
    });

    it('should return social media image', () => {
      const result = getMediaProcessTypeFromEntityType(
        EntityType.MediaProcessSocialMediaImage
      );
      expect(result).toBe(MediaProcessType.SocialMediaImage);
    });

    it('should return social media three sixty image', () => {
      const result = getMediaProcessTypeFromEntityType(
        EntityType.MediaProcessSocialMediaThreeSixtyImage
      );
      expect(result).toBe(MediaProcessType.SocialMediaThreeSixtyImage);
    });

    it('should return social media video', () => {
      const result = getMediaProcessTypeFromEntityType(
        EntityType.MediaProcessSocialMediaVideo
      );
      expect(result).toBe(MediaProcessType.SocialMediaVideo);
    });

    it('should return social media three sixty video', () => {
      const result = getMediaProcessTypeFromEntityType(
        EntityType.MediaProcessSocialMediaThreeSixtyVideo
      );
      expect(result).toBe(MediaProcessType.SocialMediaThreeSixtyVideo);
    });

    it('should throw a range error if entity type is not a media process type', () => {
      const entityType = '' as EntityType;
      expect(() => {
        getMediaProcessTypeFromEntityType(entityType);
      }).toThrow(RangeError);
    });

    it('should throw correct error message', () => {
      const entityType = 'invalidEntityType' as EntityType;
      expect(() => {
        getMediaProcessTypeFromEntityType(entityType);
      }).toThrow(
        `Unable to get media process type from entity type ${entityType}`
      );
    });
  });
});
