import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { FavoritesDto } from '@dark-rush-photography/shared/types';
import { Public } from '@dark-rush-photography/shared-server/util';
import { FavoritesService } from './favorites.service';

@Controller({ path: 'favorites', version: '1' })
@Public()
@ApiTags('Public Favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @ApiOkResponse({ type: FavoritesDto })
  findOne$(): Observable<FavoritesDto> {
    return this.favoritesService.findOne$();
  }
}
