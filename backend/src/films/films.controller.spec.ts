import { Test } from '@nestjs/testing';

import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
    let filmsController: FilmsController;
    let filmsService: FilmsService;
  
    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [FilmsController],
            providers: [FilmsService],
          })
          .overrideProvider(FilmsService)
          .useValue({
            findAll: jest.fn(),
            findSchedule: jest.fn(),
          })
          .compile();
        filmsController = moduleRef.get<FilmsController>(FilmsController);
        filmsService = moduleRef.get<FilmsService>(FilmsService);
      });

      it('.findAll() should call findAll method of the service', () => {
        filmsController.findAll();
        expect(filmsService.findAll).toHaveBeenCalled();
      });
    
      it('.findSchedule() should call findSchedule method of the service', () => {
        const item = 'Any_film_ID';
        filmsController.findSchedule(item);
        expect(filmsService.findSchedule).toHaveBeenCalledWith(item);
      });


    });      
    
    
  