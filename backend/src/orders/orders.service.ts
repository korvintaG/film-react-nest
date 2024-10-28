import { HttpStatus, HttpException, Injectable } from '@nestjs/common';
import { CreateOrderDto, OrderResponseDto } from './dto/order.dto';
import { FilmsRepository } from '../repository/films.repository.mongodb';
import { formUniqueStringArray } from '../utils/utils';

@Injectable()
export class OrdersService {
  constructor(private readonly repository: FilmsRepository) {}

  async create(createOrdersDto: CreateOrderDto[]) {
    const filmIdsUnique = formUniqueStringArray(
      createOrdersDto.map((el) => el.film),
    ); // готовим список ID уникальных фильмов из заказа
    const films = await this.repository.findByIds(filmIdsUnique); // один раз обращаемся к базе данных и сразу забираем все уникальные фильмы по заказу

    // проверки по бизнес-логике
    if (films.length != filmIdsUnique.length)
      throw new HttpException(
        'Не все фильмы найдены в базе',
        HttpStatus.BAD_REQUEST,
      );

    const resp: OrderResponseDto[] = []; // сразу формируем данные для ответа
    for (let i = 0; i < createOrdersDto.length; i++) {
      const film = films.find((el) => (el.id = createOrdersDto[i].film));
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
      seance.taken.push(taken);
      resp.push(OrderResponseDto.from({ ...createOrdersDto[i] }));
    }

    // раз сюда дошли, значит все проверки пройдены, можно менять базу - бронировать места
    await this.repository.updateFilms(films); // собственно говоря обновление базы
    return { items: resp, total: resp.length }; // возврат ответа требуемого
  }
}
