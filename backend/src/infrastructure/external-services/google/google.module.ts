import { Module } from '@nestjs/common';

import { RoutesServices } from '@domain/ports/routes';
import { GeolocationService } from '@domain/ports/geolocation';
import { GoogleRoutesService } from './services/routes.service';
import { GoogleGeolocationService } from './services/geolocation.service';

@Module({
  imports: [],
  providers: [
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
