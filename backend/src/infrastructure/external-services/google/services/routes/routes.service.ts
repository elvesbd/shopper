import { ConfigService } from '@nestjs/config';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { RoutesServices } from '@domain/ports/routes';
import { HttpService } from '@infrastructure/external-services';
import { RoutesResponse } from '@infrastructure/external-services/google/services/routes/types';
import {
  GOOGLE_API_BASE_URL,
  GOOGLE_API_HEADERS,
} from '@infrastructure/external-services/google/google-api.constants';

@Injectable()
export class GoogleRoutesService implements RoutesServices {
  private readonly directionsApiUrl: string = GOOGLE_API_BASE_URL.DIRECTIONS;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async calculateRoute(
    origin: { lat: number; lng: number },
    destination: { lat: number; lng: number },
  ): Promise<RoutesResponse> {
    try {
      const apiKey = this.configService.get<string>('GOOGLE_API_KEY');
      const url = `${this.directionsApiUrl}?key=${apiKey}`;

      const payload = {
        origin: this.createLocation(origin.lat, origin.lng),
        destination: this.createLocation(destination.lat, destination.lng),
      };

      const headers = {
        'X-Goog-FieldMask': GOOGLE_API_HEADERS.FIELD_MASK,
      };

      return await this.httpService.post<RoutesResponse>(url, payload, headers);
    } catch (error) {
      console.error('Erro ao consultar a API do Google Directions:', error);
      throw new InternalServerErrorException(
        'Erro ao consultar a API do Google Directions.',
      );
    }
  }

  private createLocation(lat: number, lng: number) {
    return {
      location: {
        latLng: {
          latitude: lat,
          longitude: lng,
        },
      },
    };
  }
}
