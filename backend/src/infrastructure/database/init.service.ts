import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TypeORMDriverEntity } from './typeorm/entities/driver/driver.entity';

@Injectable()
export class DatabaseInitService implements OnApplicationBootstrap {
  constructor(private readonly dataSource: DataSource) {}
  private readonly logger = new Logger(DatabaseInitService.name);

  async onApplicationBootstrap(): Promise<void> {
    this.logger.log('Executando migrações...');
    await this.dataSource.runMigrations();

    this.logger.log('Populando tabela drivers...');
    const driverRepository = this.dataSource.getRepository(TypeORMDriverEntity);
    const existingDrivers = await driverRepository.find();
    if (existingDrivers.length === 0) {
      await driverRepository.save([
        {
          name: 'Homer Simpson',
          description:
            'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).',
          vehicle: 'Plymouth Valiant 1973 rosa e enferrujado',
          rating: 2,
          comment:
            'Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.',
          pricePerKm: 250,
          minimumMeters: 1000,
        },
        {
          name: 'Dominic Toretto',
          description:
            'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.',
          vehicle: 'Dodge Charger R/T 1970 modificado',
          rating: 4,
          comment:
            'Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!',
          pricePerKm: 500,
          minimumMeters: 5000,
        },
        {
          name: 'James Bond',
          description:
            'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.',
          vehicle: 'Aston Martin DB5 clássico',
          rating: 5,
          comment:
            'Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.',
          pricePerKm: 1000,
          minimumMeters: 10000,
        },
      ]);
      this.logger.log('Tabela drivers populada.');
    } else {
      this.logger.log('Tabela drivers já está populada.');
    }
  }
}
