export interface ISchedule {
  id: string;
  daytime: Date;
  hall: number;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
}

export interface IFilm {
  id: string;
  rating: number;
  director: string;
  tags: string[];
  image: string;
  cover: string;
  title: string;
  about: string;
  description: string;
  schedule: ISchedule[];
}

export interface IFilmsRepository {
  findAll(): Promise<IFilm[]>;
  findById(id: string): Promise<IFilm>;
  findByIds(ids: string[]): Promise<IFilm[]>;
  updateFilms(films: IFilm[]): void;
}
