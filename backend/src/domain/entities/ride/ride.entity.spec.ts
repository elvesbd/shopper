import { Ride } from '@domain/entities';
import { RideDataBuilder } from '@test/__mocks__/data-builder';

describe('Ride Entity', () => {
  const props = RideDataBuilder.aRide().build();
  const ride = Ride.create(props);

  describe('constructor', () => {
    it('should create a new Ride on success', () => {
      expect(ride).toBeInstanceOf(Ride);
      expect(ride.id).toBeDefined();
      expect(ride).toEqual(expect.objectContaining(props));
    });
  });

  describe('create', () => {
    it('should create a Ride using the static create method', () => {
      expect(ride).toBeInstanceOf(Ride);
      expect(ride.id).toBeDefined();
      expect(ride.value).toBe(props.value);
      expect(ride.origin).toBe(props.origin);
      expect(ride.driver).toEqual(props.driver);
      expect(ride.customer_id).toBe(props.customer_id);
      expect(ride.destination).toBe(props.destination);
      expect(ride.distance).toBe(props.distance);
      expect(ride.duration).toBe(props.duration);
      expect(ride.date).toBeDefined();
    });
  });

  describe('restore', () => {
    it('should restore a Ride from existing data', () => {
      const restoredRide = Ride.restore({
        ...props,
        date: new Date('2023-01-01T00:00:00Z'),
      });

      expect(restoredRide).toBeInstanceOf(Ride);
      expect(restoredRide.value).toBe(props.value);
      expect(restoredRide.date).toEqual(new Date('2023-01-01T00:00:00Z'));
    });
  });

  describe('getters', () => {
    it('should return the correct customer_id', () => {
      expect(ride.customer_id).toBe(props.customer_id);
    });

    it('should return the correct driver_id', () => {
      expect(ride.driver_id).toBe(props.driver.id);
    });

    it('should return the correct origin', () => {
      expect(ride.origin).toBe(props.origin);
    });

    it('should return the correct destination', () => {
      expect(ride.destination).toBe(props.destination);
    });

    it('should return the correct distance', () => {
      expect(ride.distance).toBe(props.distance);
    });

    it('should return the correct duration', () => {
      expect(ride.duration).toBe(props.duration);
    });

    it('should return the correct value', () => {
      expect(ride.value).toBe(props.value);
    });

    it('should return the correct date', () => {
      expect(ride.date).toBeDefined();
      expect(ride.date).toBeInstanceOf(Date);
    });

    it('should return the correct driver', () => {
      expect(ride.driver).toEqual(props.driver);
    });
  });
});
