type RideProps = {
  value: number;
  origin: string;
  driver: {
    id: number;
    name: string;
  };
  distance: number;
  duration: string;
  customer_id: string;
  destination: string;
};

export class RideDataBuilder {
  private readonly props: RideProps = {
    value: 50,
    origin: '123 Main St',
    driver: { id: 1, name: 'Driver A' },
    distance: 1000,
    duration: '500s',
    customer_id: 'customer-123',
    destination: '456 Elm St',
  };

  public static aRide(): RideDataBuilder {
    return new RideDataBuilder();
  }

  public build(): RideProps {
    return this.props;
  }
}
