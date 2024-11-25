import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('drivers')
export class TypeORMDriverEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', {
    length: 255,
    nullable: false,
  })
  name: string;

  @Column('text', {
    nullable: true,
  })
  description: string;

  @Column('varchar', {
    length: 255,
    nullable: false,
  })
  vehicle: string;

  @Column('smallint', {
    nullable: false,
    unsigned: true,
  })
  rating: number;

  @Column('text', {
    nullable: true,
  })
  comment: string;

  @Column('integer', {
    nullable: false,
  })
  pricePerKm: number;

  @Column('integer', {
    nullable: false,
  })
  minimumMeters: number;
}
