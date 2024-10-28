import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { FilmSchema } from './entities/film.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { FilmsRepository } from '../repository/films.repository.mongodb';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Film', schema: FilmSchema }])],
  controllers: [FilmsController],
  providers: [FilmsService, FilmsRepository],
})
export class FilmsModule {}
