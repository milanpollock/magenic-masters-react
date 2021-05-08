import {
  PhotoOfTheWeek,
  DocumentType,
  Month,
} from '@dark-rush-photography/shared-types';

export class RoverRoverPleaseComeOver implements PhotoOfTheWeek {
  id = '';
  type: DocumentType = 'PhotoOfTheWeek';
  slug = 'rover-rover-please-come-over';
  group = 2;
  title = 'Rover Rover Please Come Over';
  description = `Rover is my best customer`;
  keywords = [
    'Englewood',
    'Florida',
    'Rover',
    'Family Store',
    'Family',
    'Happy',
    'Memories',
  ];
  datePublished = { month: Month.January, day: 27, year: 2020 };
  location = {
    city: 'Englewood',
    stateOrProvince: 'Florida',
    country: 'United States',
  };
  useTitleImage = false;
  text = [];
  images = [];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): PhotoOfTheWeek {
    return new RoverRoverPleaseComeOver();
  }
}
