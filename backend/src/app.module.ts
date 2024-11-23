import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from './infrastructure/http';
import { DatabaseModule } from './infrastructure/database';
import { GoogleModule } from './infrastructure/external-services/google/google.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    GoogleModule,
    HttpModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
