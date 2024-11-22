type Review = {
  rating: number;
  comment: string;
};

type DriverProps = {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: Review;
  pricePerKm: number;
  minimumMeters: number;
};

export class DriverDataBuilder {
  private readonly props: DriverProps = {
    id: 1,
    name: 'Driver A',
    description:
      'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).',
    vehicle: 'Plymouth Valiant 1973 rosa e enferrujado',
    review: {
      rating: 2,
      comment:
        'Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.',
    },
    pricePerKm: 250, // em centavos
    minimumMeters: 1000, // 1 km em metros
  };

  public static aDriver(): DriverDataBuilder {
    return new DriverDataBuilder();
  }

  public withId(id: number): this {
    this.props.id = id;
    return this;
  }

  public withName(name: string): this {
    this.props.name = name;
    return this;
  }

  public withDescription(description: string): this {
    this.props.description = description;
    return this;
  }

  public withVehicle(vehicle: string): this {
    this.props.vehicle = vehicle;
    return this;
  }

  public withPricePerKm(pricePerKm: number): this {
    this.props.pricePerKm = pricePerKm;
    return this;
  }

  public withMinimumMeters(minimumMeters: number): this {
    this.props.minimumMeters = minimumMeters;
    return this;
  }

  public build(): DriverProps {
    return this.props;
  }
}
