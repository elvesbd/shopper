import { Injectable } from '@nestjs/common';
import { Driver, DriverRepository } from '@domain/ports/repository';

@Injectable()
export class TypeORMDriverRepository implements DriverRepository {
  private drivers = [
    {
      id: 1,
      name: 'Homer Simpson',
      description:
        'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).',
      vehicle: 'Plymouth Valiant 1973 rosa e enferrujado',
      review: {
        rating: 2,
        comment:
          'Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.',
      },
      pricePerKm: 250, // em centavos
      minimumMeters: 200, // 1 km em metros
    },
    {
      id: 2,
      name: 'Dominic Toretto',
      description:
        'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.',
      vehicle: 'Dodge Charger R/T 1970 modificado',
      review: {
        rating: 4,
        comment:
          'Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!',
      },
      pricePerKm: 500, // em centavos
      minimumMeters: 5000, // 5 km em metros
    },
    {
      id: 3,
      name: 'James Bond',
      description:
        'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.',
      vehicle: 'Aston Martin DB5 clássico',
      review: {
        rating: 5,
        comment:
          'Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.',
      },
      pricePerKm: 1000, // em centavos
      minimumMeters: 200, // 10 km em metros
    },
  ];

  async findAll(): Promise<Driver[]> {
    return this.drivers;
  }

  async findById(id: number): Promise<Driver | null> {
    const driver = this.drivers.find((driver) => driver.id === id);
    return driver || null;
  }
}
