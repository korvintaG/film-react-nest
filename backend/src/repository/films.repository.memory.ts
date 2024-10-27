import { Injectable } from '@nestjs/common';
import { IFilm } from '../films/entities/film.entity';
/* eslint @typescript-eslint/no-var-requires: "off" */ // вынужден отключить из-за странных глюков Nest.js
// здесь только require, если через import, то начинает дико глючить раздача статики от Nest.js
const filmsFromJson = require('../../test/mongodb_initial_stub.json');

/**
 * Репоизиторий в оперативной памяти для отладки и первого шага реализации
 */
@Injectable()
export class FilmsRepository {
  private films: IFilm[] = filmsFromJson;

  findById(id: string) {
    return this.films.find((film) => film.id === id);
  }

  findAll() {
    return this.films;
  }

  /**
   * Сохранить вариант бронирования мест в сеансе
   * @param filmId - фильм
   * @param seanceId - сеанс
   * @param taken - вариант бронирования
   */
  updateFilmSeanceTaken(filmId: string, seanceId: string, taken: string[]) {
    const film = this.findById(filmId);
    const seance = film.schedule.find((s) => s.id === seanceId);
    seance.taken = taken;
    this.films = this.films.map((el) => (el.id === filmId ? film : el));
  }
}
