type LocationProps = {
  lat: number;
  lng: number;
};

export class GeolocationDataBuilder {
  private location: LocationProps = {
    lat: -3.79557,
    lng: -38.48018,
  };

  // Método estático para instanciar o builder
  public static aGeolocation(): GeolocationDataBuilder {
    return new GeolocationDataBuilder();
  }

  // Método para definir uma nova localização
  public withLocation(lat: number, lng: number): this {
    this.location = { lat, lng };
    return this;
  }

  // Método para construir o objeto final
  public build(): LocationProps {
    return this.location;
  }
}
