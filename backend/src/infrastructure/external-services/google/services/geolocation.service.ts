import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleGeolocationService {
  async getCoordinates(address: string) {
    // Substituir pela integração real com a API

    if (address === 'Origin Address') {
      return { lat: -3.8183707, lng: -38.4678292 };
    }

    if (address === 'Destination Address') {
      return { lat: -3.79557, lng: -38.48018 };
    }
  }
}
