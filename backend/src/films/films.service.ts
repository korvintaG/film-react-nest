import { Injectable } from '@nestjs/common';
import { FilmDto, SeanceDto } from './dto/film.dto';
import { FilmsRepository } from '../repository/films.repository.mongodb';

@Injectable()
export class FilmsService {
  constructor(private readonly repository: FilmsRepository) {}

  async findAll() {
    const films = await this.repository.findAll();
    return { total: films.length, items: films.map(FilmDto.from) };
  }

  async findSchedule(filmId: string) {
    const film = await this.repository.findById(filmId);
    return {
      total: film.schedule.length,
      items: film.schedule.map(SeanceDto.from),
    };
  }
}
