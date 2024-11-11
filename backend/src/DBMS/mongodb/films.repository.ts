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

  async findAll() {
    return this.filmModel.find({});
  }

  async findById(id: string) {
    return this.filmModel.findOne({ id });
  }

  async findByIds(ids: string[]) {
    return this.filmModel.find({ id: { $in: ids } });
  }

  async updateFilms(films: IFilm[]) {
    for (let i = 0; i < films.length; i++) {
      await this.filmModel.updateOne({ id: films[i].id }, films[i]);
    }
  }
}
