import { Driver } from '@domain/shared';
import { Entity } from '@domain/shared/entity';

type RideProps = {
  value: number;
  origin: string;
  driver: Driver;
  distance: number;
  duration: string;
  customer_id: string;
  destination: string;
};

type RideConstructorProps = RideProps & {
  date: Date;
};

export class Ride extends Entity<RideProps> {
  private readonly _date: Date;
  private readonly _value: number;
  private readonly _origin: string;
  private readonly _driver: Driver;
  private readonly _distance: number;
  private readonly _duration: string;
  private readonly _customer_id: string;
  private readonly _destination: string;

  constructor(props: RideConstructorProps) {
    super(props);

    this._date = props.date;
    this._value = props.value;
    this._origin = props.origin;
    this._driver = props.driver;
    this._distance = props.distance;
    this._duration = props.duration;
    this._customer_id = props.customer_id;
    this._destination = props.destination;
  }

  static create(props: RideProps): Ride {
    return new Ride({
      ...props,
      date: new Date(),
      driver: props.driver,
    });
  }

  static restore(props: RideConstructorProps): Ride {
    return new Ride(props);
  }

  get customer_id(): string {
    return this._customer_id;
  }

  get driver_id(): number {
    return this._driver.id;
  }

  get origin(): string {
    return this._origin;
  }

  get destination(): string {
    return this._destination;
  }

  get distance(): number {
    return this._distance;
  }

  get duration(): string {
    return this._duration;
  }

  get value(): number {
    return this._value;
  }

  get date(): Date {
    return this._date;
  }

  get driver(): Driver {
    return this._driver;
  }
}
