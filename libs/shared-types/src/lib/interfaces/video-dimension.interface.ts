import { VideoDimensionType } from '../enums/video-dimension-type.enum';
import { VideoDimensionState } from '../enums/video-dimension-state.enum';
import { MediaDimensionPixels } from './media-dimension-pixels.interface';
import { VideoDimensionSettings } from './video-dimension-settings.interface';

export interface VideoDimension {
  readonly entityId: string;
  readonly videoSlug: string;
  readonly type: VideoDimensionType;
  readonly state: VideoDimensionState;
  readonly pixels: MediaDimensionPixels;
  readonly settings: VideoDimensionSettings;
}