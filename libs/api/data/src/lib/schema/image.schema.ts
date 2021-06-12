import { imageDimensionSchema } from './image-dimension.schema';
import { emotionSchema } from './emotion.schema';
import { commentSchema } from './comment.schema';

export const imageSchema = {
  entityId: { type: String, required: true },
  slug: { type: String, required: true },
  state: {
    type: String,
    enum: ['New', 'Public', 'Archived'],
    required: true,
  },
  order: { type: Number, required: true },
  isStared: { type: Boolean, required: true },
  isLoved: { type: Boolean, required: true },
  isLiked: { type: Boolean, required: true },
  title: { type: String, required: false },
  description: { type: String, required: false },
  keywords: { type: [String], required: true },
  dateCreated: { type: String, required: true },
  datePublished: { type: String, required: false },
  dimensions: { type: [imageDimensionSchema], required: true },
  emotions: { type: [emotionSchema], required: true },
  comments: { type: [commentSchema], required: true },
};
