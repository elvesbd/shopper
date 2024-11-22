import { Injectable } from '@nestjs/common';
import { Route, RoutesServices } from '@domain/ports/routes';

@Injectable()
export class GoogleRoutesService implements RoutesServices {
  async calculateRoute(
    origin: { lat: number; lng: number },
    destination: { lat: number; lng: number },
  ): Promise<{ routes: Route[] }> {
    // Substituir pela integração real com a API
    return {
      routes: [
        {
          distanceMeters: 10000,
          duration: '536s',
          polyline: {
            encodedPolyline:
              'xwhV|fxiF?hBhDRe@dEs@`J_@zDUhDO?{ArBIDuI`LcCxCu@dAmDpEyD`FkArA]T{@m@mAo@YC]QgA[yCYy@E_CDqKd@yDL{BD_o@bC_BHIeDSiFG_BaOl@t@jPKH',
          },
        },
      ],
    };
  }
}
