import { FilmDocument, SeanceDocument } from '../entities/film.entity';

export class SeanceDto {
  constructor(
    public id: string,
    public daytime: Date,
    public hall: number,
    public rows: number,
    public seats: number,
    public price: number,
    public taken: string[],
  ) {}

  static from = (seanceDocument: SeanceDocument): SeanceDto =>
    new SeanceDto(
      seanceDocument.id,
      seanceDocument.daytime,
      seanceDocument.hall,
      seanceDocument.rows,
      seanceDocument.seats,
      seanceDocument.price,
      seanceDocument.taken,
    );
}

export class FilmDto {
  constructor(
    public id: string,
    public rating: number,
    public director: string,
    public tags: string[],
    public image: string,
    public cover: string,
    public title: string,
    public about: string,
    public description: string,
  ) {}

  static from = (filmDocument: FilmDocument): FilmDto =>
    new FilmDto(
      filmDocument.id,
      filmDocument.rating,
      filmDocument.director,
      filmDocument.tags,
      filmDocument.image,
      filmDocument.cover,
      filmDocument.title,
      filmDocument.about,
      filmDocument.description,
    );
}
