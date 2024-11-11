import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Film, FilmRow } from './film.entity';
import { IFilm, IFilmsRepository } from '../../types/custom';

/**
 * Рабочий вариант репозитория в Postgres
 */
@Injectable()
export class FilmsRepository implements IFilmsRepository {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
  ) {}

  private static film2FilmDocument(film: Film): IFilm {
    const newSchedule = film.schedule.map((sch) => {
      const newSch = {
        ...sch,
        taken: sch.taken ? sch.taken.split(',') : [],
        daytime: new Date(sch.daytime),
      };
      return newSch;
    });
    const newFilm = {
      ...film,
      tags: film.tags.split(','),
      schedule: newSchedule,
    };
    return newFilm;
  }

  private static filmDocument2Film(film: IFilm): FilmRow {
    const newSchedule = film.schedule.map((sch) => {
      const newSch = {
        ...sch,
        taken: sch.taken.join(','),
        daytime: sch.daytime.toISOString(),
      };
      return newSch;
    });
    const newFilm = {
      ...film,
      tags: film.tags.join(','),
      schedule: newSchedule,
    };
    return newFilm;
  }

  /**
   * получить список всех фильмов
   * @returns список объектов всех фильмов
   */
  async findAll() {
    const res = await this.filmRepository.find({
      relations: { schedule: true },
    });
    return res.map(FilmsRepository.film2FilmDocument);
  }

  /**
   * получить фильм по его ID
   * @param id - ID фильма
   * @returns объект фильма
   */
  async findById(id: string) {
    const res = await this.filmRepository.findOne({
      where: { id },
      relations: { schedule: true },
    });
    return FilmsRepository.film2FilmDocument(res);
  }

  /**
   * получить фильмы по списку их ID
   * @param ids - список ID фильмов
   * @returns список объектов фильмов
   */
  async findByIds(ids: string[]) {
    const res = await this.filmRepository.find({
      where: { id: In(ids) },
      relations: { schedule: true },
    });
    return res.map(FilmsRepository.film2FilmDocument);
  }

  /**
   * обновить в базе фильмы по списку
   * @param films - объекты фильмов для обновления
   */
  async updateFilms(films: IFilm[]) {
    for (let i = 0; i < films.length; i++) {
      await this.filmRepository.save(
        FilmsRepository.filmDocument2Film(films[i]),
      );
    }
  }
}
