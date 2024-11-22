import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { RideConfirmUseCase } from '@domain/usecases';
import {
  RideConfirmRequestDto,
  RideConfirmResponseDto,
} from '@infrastructure/http/presenters/controllers/rides/ride-confirm/dtos';
import { ApiPath } from '@infrastructure/http/presenters/controllers/constants';

@Controller(ApiPath)
export class RideConfirmController {
  constructor(private readonly rideConfirmUseCase: RideConfirmUseCase) {}

  @HttpCode(HttpStatus.OK)
  @Post('confirm')
  public async confirmRide(
    @Body() dto: RideConfirmRequestDto,
  ): Promise<RideConfirmResponseDto> {
    return await this.rideConfirmUseCase.execute(dto);
  }
}
