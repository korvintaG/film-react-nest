import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Film } from './film.entity';

export type ScheduleRow = Omit<Schedule, 'film'>;

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn('uuid', {})
  id: string;
  @Column()
  daytime: string;
  @Column('integer')
  hall: number;
  @Column('integer')
  rows: number;
  @Column('integer')
  seats: number;
  @Column('float')
  price: number;
  @Column('text')
  taken: string;
  @ManyToOne(() => Film, (film) => film.schedule, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  film: Film;
}
