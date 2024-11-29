import { Test } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { CreateOrderRequestDto } from './dto/order.dto';

describe('OrdersController', () => {
  let ordersController: OrdersController;
  let ordersService: OrdersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [OrdersService],
    })
      .overrideProvider(OrdersService)
      .useValue({
        create: jest.fn(),
      })
      .compile();
    ordersController = moduleRef.get<OrdersController>(OrdersController);
    ordersService = moduleRef.get<OrdersService>(OrdersService);
  });

  it('.create() should call create method of the service', () => {
    const item = new CreateOrderRequestDto();
    ordersController.create(item);
    expect(ordersService.create).toHaveBeenCalledWith(item.tickets);
  });
});
