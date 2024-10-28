import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type FilmDocument = Film & Document<Types.ObjectId>;
export type SeanceDocument = Seance & Document<Types.ObjectId>;

export interface ISeance {
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
  schedule: Seance[];
}

export class Seance implements ISeance {
  @Prop({ type: String, required: true })
  id: string;
  @Prop({ type: Date, required: true })
  daytime: Date;
  @Prop({ type: Number, required: true })
  hall: number;
  @Prop({ type: Number, required: true })
  rows: number;
  @Prop({ type: Number, required: true })
  seats: number;
  @Prop({ type: Number, required: true })
  price: number;
  @Prop({ type: [String], required: true })
  taken: string[];
}

@Schema({ collection: 'films' })
export class Film implements IFilm {
  @Prop({ required: true, type: String })
  id: string;

  @Prop({ required: true, type: Number })
  rating: number;

  @Prop({ required: true, type: String })
  director: string;

  @Prop({ required: true, type: [String] })
  tags: string[];

  @Prop({ required: true, type: String })
  image: string;

  @Prop({ required: true, type: String })
  cover: string;

  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: true, type: String })
  about: string;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ required: true, type: [Seance] })
  schedule: Seance[];
}

export const FilmSchema = SchemaFactory.createForClass(Film);
