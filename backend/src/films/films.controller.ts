import { Controller, Get, Param, Logger  } from '@nestjs/common';
import { FilmsService } from './films.service';


@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  findAll() {
    Logger.log('findAll + !!');
    return this.filmsService.findAll();
  }

  @Get(':id/schedule')
  findSchedule(@Param('id') filmId: string) {
    return this.filmsService.findSchedule(filmId);
  }
}
