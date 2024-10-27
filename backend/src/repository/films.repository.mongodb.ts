import { Injectable } from '@nestjs/common';
import { FilmDocument } from '../films/entities/film.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

/**
 * Рабочий вариант репозитория в MongoDB
 */
@Injectable()
export class FilmsRepository {
  constructor(@InjectModel('Film') private filmModel: Model<FilmDocument>) {}

  async findAll() {
    return this.filmModel.find({});
  }

  async findById(id: string) {
    return this.filmModel.findOne({ id });
  }

  /**
   * Сохранить вариант бронирования мест в сеансе
   * @param filmId - фильм
   * @param seanceId - сеанс
   * @param taken - вариант бронирования
   */
  async updateFilmSeanceTaken(
    filmId: string,
    seanceId: string,
    taken: string[],
  ) {
    const film = await this.findById(filmId);
    const seance = film.schedule.find((s) => s.id === seanceId);
    seance.taken = taken;
    await this.filmModel.updateOne({ id: filmId }, film);
  }
}
