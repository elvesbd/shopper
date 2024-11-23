import {
  Get,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  Controller,
} from '@nestjs/common';

import { RideListUseCase } from '@domain/usecases';
import {
  RideListViewModel,
  RideListViewModelResponse,
} from '@infrastructure/http/presenters/view-models';
import { ParseDriverIdPipe } from '@application/adapters/pipes';
import { ApiPath } from '@infrastructure/http/presenters/controllers/constants';

@Controller(ApiPath)
export class RideListController {
  constructor(private readonly rideListUseCase: RideListUseCase) {}

  @HttpCode(HttpStatus.OK)
  @Get('list/:customer_id')
  public async listRide(
    @Param('customer_id') customer_id: string,
    @Query('driver_id', ParseDriverIdPipe) driver_id?: number,
  ): Promise<RideListViewModelResponse> {
    const rides = await this.rideListUseCase.execute({
      customer_id,
      driver_id,
    });
    return RideListViewModel.toHTTP(rides);
  }
}
