import { Controller, Post, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderRequestDto } from './dto/order.dto';

@Controller('order')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() сreateOrderRequestDto: CreateOrderRequestDto) {
    return this.ordersService.create(сreateOrderRequestDto.tickets);
  }
}
