import { OneToMany, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Schedule, ScheduleRow } from './schedule.entity';

export type FilmRow = Omit<Film, 'schedule'> & { schedule: ScheduleRow[] };

@Entity('films')
export class Film {
  @PrimaryGeneratedColumn('uuid', {})
  id: string;

  @Column('float')
  rating: number;

  @Column('varchar')
  director: string;

  @Column('text')
  tags: string;

  @Column('varchar')
  image: string;

  @Column('varchar')
  cover: string;

  @Column('varchar')
  title: string;

  @Column('varchar')
  about: string;

  @Column('varchar')
  description: string;

  @OneToMany(() => Schedule, (schedule) => schedule.film, { cascade: true })
  schedule: Schedule[];
}
