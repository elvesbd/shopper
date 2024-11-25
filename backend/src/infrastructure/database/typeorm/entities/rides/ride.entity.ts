import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rides')
@Index('idx_customer_id', ['customer_id'])
@Index('idx_driver_id', ['driver_id'])
export class TypeORMRideEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    length: 255,
    nullable: false,
  })
  customer_id: string;

  @Column('varchar', {
    length: 255,
    nullable: false,
  })
  origin: string;

  @Column('varchar', {
    length: 255,
    nullable: false,
  })
  destination: string;

  @Column('integer', {
    nullable: false,
  })
  distance: number;

  @Column('varchar', {
    length: 50,
    nullable: false,
  })
  duration: string;

  @Column('integer', {
    nullable: false,
  })
  driver_id: number;

  @Column('varchar', {
    length: 255,
    nullable: false,
  })
  driver_name: string;

  @Column('integer', {
    nullable: false,
  })
  value: number;

  @Column('timestamp', {
    nullable: false,
  })
  date: Date;
}
