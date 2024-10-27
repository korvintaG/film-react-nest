import { HttpStatus, HttpException, Injectable } from '@nestjs/common';
import { CreateOrderDto, OrderResponseDto } from './dto/order.dto';
import { FilmsRepository } from '../repository/films.repository.mongodb';

@Injectable()
export class OrdersService {
  constructor(private readonly repository: FilmsRepository) {}

  async create(createOrdersDto: CreateOrderDto[]) {
    // проверки по бизнес-логике
    for (let i = 0; i < createOrdersDto.length; i++) {
      const film = await this.repository.findById(createOrdersDto[i].film);
      if (!film || film === null) {
        throw new HttpException('Фильм не найден', HttpStatus.BAD_REQUEST);
      }
      const seance = film.schedule.find(
        (el) => el.id === createOrdersDto[i].session,
      );
      if (!seance || seance === null) {
        throw new HttpException('Сеанс не найден', HttpStatus.BAD_REQUEST);
      }
      if (
        createOrdersDto[i].row > seance.rows ||
        createOrdersDto[i].seat > seance.seats
      )
        throw new HttpException('Недопустимое место', HttpStatus.BAD_REQUEST);
      if (createOrdersDto[i].price != seance.price)
        throw new HttpException('Неверная цена', HttpStatus.BAD_REQUEST);
      if (createOrdersDto[i].daytime != seance.daytime)
        throw new HttpException(
          'Неверное дата-время сеанса',
          HttpStatus.BAD_REQUEST,
        );

      const taken = `${createOrdersDto[i].row}:${createOrdersDto[i].seat}`;
      const found = seance.taken.find((el) => el === taken);
      if (found && found != null) {
        throw new HttpException(
          'Место на сеанс уже забронировано',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    // собственно говоря действия
    const resp: OrderResponseDto[] = [];
    for (let i = 0; i < createOrdersDto.length; i++) {
      const film = await this.repository.findById(createOrdersDto[i].film);
      const seance = film.schedule.find(
        (el) => el.id === createOrdersDto[i].session,
      );
      const taken = `${createOrdersDto[i].row}:${createOrdersDto[i].seat}`;
      seance.taken.push(taken);
      await this.repository.updateFilmSeanceTaken(
        createOrdersDto[i].film,
        createOrdersDto[i].session,
        seance.taken,
      );
      resp.push(OrderResponseDto.from({ ...createOrdersDto[i] }));
    }
    return { items: resp, total: resp.length };
  }
}
