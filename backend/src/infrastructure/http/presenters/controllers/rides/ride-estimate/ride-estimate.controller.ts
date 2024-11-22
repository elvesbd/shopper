import { Body, Controller, Post } from '@nestjs/common';

import { RideEstimateUseCase } from '@domain/usecases';
import {
  RideEstimateRequestDto,
  RideEstimateResponseDto,
} from '@infrastructure/http/presenters/controllers/rides/ride-estimate/dtos';
import { ApiPath } from '@infrastructure/http/presenters/controllers/constants';

@Controller(ApiPath)
export class RideEstimateController {
  constructor(private readonly rideEstimateUseCase: RideEstimateUseCase) {}

  @Post('estimate')
  public async estimateRide(
    @Body() dto: RideEstimateRequestDto,
  ): Promise<RideEstimateResponseDto> {
    const user = await this.rideEstimateUseCase.execute(dto);

    return user;
  }
}
