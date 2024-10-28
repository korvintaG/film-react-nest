//TODO реализовать DTO для /orders
import {
  IsNumber,
  IsDateString,
  IsString,
  IsNotEmpty,
  Min,
  IsInt,
  IsEmail,
  IsArray,
  ArrayMinSize,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { faker } from '@faker-js/faker';

interface OrderDocument {
  film: string;
  session: string;
  daytime: Date;
  row: number;
  seat: number;
  price: number;
}

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty({ message: 'Field $property cannot be empty.' })
  film: string;

  @IsString()
  @IsNotEmpty({ message: 'Field $property cannot be empty.' })
  session: string;

  @IsDateString()
  @IsNotEmpty({ message: 'Field $property cannot be empty.' })
  daytime: Date;

  @IsInt()
  @Min(0)
  @IsNotEmpty({ message: 'Field $property cannot be empty.' })
  row: number;

  @IsInt()
  @Min(0)
  @IsNotEmpty({ message: 'Field $property cannot be empty.' })
  seat: number;

  @IsNumber()
  @Min(0)
  @IsNotEmpty({ message: 'Field $property cannot be empty.' })
  price: number;
}

export class CreateOrderRequestDto {
  @IsEmail()
  @IsNotEmpty({ message: 'Field $property cannot be empty.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Field $property cannot be empty.' })
  phone: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => CreateOrderDto)
  tickets: CreateOrderDto[];
}

export class OrderResponseDto {
  constructor(
    public id: string,
    public film: string,
    public session: string,
    public daytime: Date,
    public row: number,
    public seat: number,
    public price: number,
  ) {}

  static from = (orderDocument: OrderDocument): OrderResponseDto =>
    new OrderResponseDto(
      faker.string.uuid(),
      orderDocument.film,
      orderDocument.session,
      orderDocument.daytime,
      orderDocument.row,
      orderDocument.seat,
      orderDocument.price,
    );
}
