import { Body, Controller, Post } from '@nestjs/common';

import { RideEstimateUseCase } from '@domain/usecases';
import {
  RideEstimateViewModel,
  RideEstimateViewModelResponse,
} from '@infrastructure/http/presenters/view-models';
import { ApiPath } from '@infrastructure/http/presenters/controllers/constants';
import { RideEstimateRequestDto } from '@infrastructure/http/presenters/controllers/rides/ride-estimate/dtos';

@Controller(ApiPath)
export class RideEstimateController {
  constructor(private readonly rideEstimateUseCase: RideEstimateUseCase) {}

  @Post('estimate')
  public async estimateRide(
    @Body() dto: RideEstimateRequestDto,
  ): Promise<RideEstimateViewModelResponse> {
    const rideEstimate = await this.rideEstimateUseCase.execute(dto);

    return RideEstimateViewModel.toHTTP(rideEstimate);
  }
}
