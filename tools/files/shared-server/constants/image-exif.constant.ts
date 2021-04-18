import { ImageArtistExif } from '../interfaces/image-artist-exif';

export const darkRushPhotographyImageExif = (
  year: number
): ImageArtistExif => ({
  rating: 5,
  artist: 'Dark Rush',
  copyright: `© ${year} Dark Rush Photography, All Rights Reserved`,
  rights: `For Placement with Credit © ${year} Dark Rush: www.darkrushphotography.com, all other rights reserved.`,
  byline: 'Dark Rush Photography',
  bylineTitle: 'Specializes in Event Photography and Extended Reality (XR)',
  creditLine: '© www.darkrushphotography.com',
  contact: 'dark@darkrush.photo',
  city: 'Atlanta',
  stateOrProvince: 'Georgia',
  country: 'United States',
  keywords: new Set<string>(['Dark Rush Photography', 'Photography']),
});
