/**
 * Данный модуль не используется в программе.
 * Он нужен для эмуляции работы базы в памяти, точнее говоря для понимания как это делается
 */
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
   * получить фильмы по списку их ID
   * @param ids - список ID фильмов
   * @returns список объектов фильмов
   */
  async findByIds(ids: string[]) {
    return this.films.filter((film) => ids.includes(film.id));
  }

  /**
   * обновить в базе фильмы по списку
   * @param films - объекты фильмов для обновления
   */
  async updateFilms(films: IFilm[]) {
    const filmIds = films.map((el) => el.id);
    this.films = this.films.map((film) =>
      filmIds.includes(film.id) ? films.find((el) => el.id === film.id) : film,
    );
  }
}
