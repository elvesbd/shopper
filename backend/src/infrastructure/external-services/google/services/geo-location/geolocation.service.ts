import { ConfigService } from '@nestjs/config';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { HttpService } from '@infrastructure/external-services';
import { GOOGLE_API_BASE_URL } from '@infrastructure/external-services/google/google-api.constants';
import { GeocodeResponse } from '@infrastructure/external-services/google/services/geo-location/types';

@Injectable()
export class GoogleGeolocationService {
  private readonly geocodeUrl: string = GOOGLE_API_BASE_URL.GEOCODE;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getCoordinates(address: string) {
    try {
      const apiKey = this.configService.get<string>('GOOGLE_API_KEY');
      const url = `${this.geocodeUrl}?address=${encodeURIComponent(address)}&key=${apiKey}`;

      const data = await this.httpService.get<GeocodeResponse>(url);
      if (data.results.length === 0) {
        throw new BadRequestException(
          'Nenhum resultado foi retornado para o endereço fornecido.',
        );
      }
      const location = data.results[0].geometry.location;

      return { lat: location.lat, lng: location.lng };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Erro ao consultar a API do Google Geocoding.',
      );
    }
  }
}
