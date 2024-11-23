import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { RoutesServices } from '@domain/ports/routes';
import { GeolocationService } from '@domain/ports/geolocation';
import {
  GoogleRoutesService,
  GoogleGeolocationService,
} from '@infrastructure/external-services/google/services';
import { HttpService } from '@infrastructure/external-services/http-service';

@Module({
  imports: [HttpModule],
  providers: [
    HttpService,
    {
      provide: RoutesServices,
      useClass: GoogleRoutesService,
    },
    {
      provide: GeolocationService,
      useClass: GoogleGeolocationService,
    },
  ],
  exports: [RoutesServices, GeolocationService],
})
export class GoogleModule {}
