import { Module } from '@nestjs/common';
import { DatabaseModule } from './infrastructure/database';
import { GoogleModule } from './infrastructure/external-services/google/google.module';
import { HttpModule } from './infrastructure/http';

@Module({
  imports: [DatabaseModule, GoogleModule, HttpModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
