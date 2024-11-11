import { Injectable, Inject } from '@nestjs/common';
import { FilmDto, ScheduleDto } from './dto/film.dto';
import { FilmsRepository as MongoDBFilmsRepository } from '../DBMS/mongodb/films.repository';
import { FilmsRepository as PostgresFilmsRepository } from '../DBMS/postgres/films.repository';

@Injectable()
export class FilmsService {
  constructor(
    @Inject('FILMS_REPOSITORY')
    private readonly repository:
      | MongoDBFilmsRepository
      | PostgresFilmsRepository,
  ) {}

  async findAll() {
    const films = await this.repository.findAll();
    return { total: films.length, items: films.map(FilmDto.from) };
  }

  async findSchedule(filmId: string) {
    const film = await this.repository.findById(filmId);
    return {
      total: film.schedule.length,
      items: film.schedule.map(ScheduleDto.from),
    };
  }
}
