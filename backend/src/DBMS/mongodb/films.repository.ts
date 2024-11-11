import { Injectable } from '@nestjs/common';
import { FilmDocument } from './film.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IFilmsRepository, IFilm } from '../../types/custom';

/**
 * Рабочий вариант репозитория в MongoDB
 */
@Injectable()
export class FilmsRepository implements IFilmsRepository {
  constructor(@InjectModel('Film') private filmModel: Model<FilmDocument>) {}

  /**
   * получить список всех фильмов
   * @returns список объектов всех фильмов
   */
  async findAll() {
    return this.filmModel.find({});
  }

  /**
   * получить фильм по его ID
   * @param id - ID фильма
   * @returns объект фильма
   */
  async findById(id: string) {
    return this.filmModel.findOne({ id });
  }

  /**
   * получить фильмы по списку их ID
   * @param ids - список ID фильмов
   * @returns список объектов фильмов
   */
  async findByIds(ids: string[]) {
    return this.filmModel.find({ id: { $in: ids } });
  }

  /**
   * обновить в базе фильмы по списку
   * @param films - объекты фильмов для обновления
   */
  async updateFilms(films: IFilm[]) {
    for (let i = 0; i < films.length; i++) {
      await this.filmModel.updateOne({ id: films[i].id }, films[i]);
    }
  }
}
