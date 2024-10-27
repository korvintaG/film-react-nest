import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FilmSchema } from '../films/entities/film.entity';
import { FilmsRepository } from '../repository/films.repository.mongodb';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Film', schema: FilmSchema }])],
  controllers: [OrdersController],
  providers: [OrdersService, FilmsRepository],
})
export class OrdersModule {}
