import { Module } from '@nestjs/common';
import { MONGO_CONFIG } from './config/db.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: '.env', 
  }),
    ...MONGO_CONFIG,
  ],
  exports: [
    ...MONGO_CONFIG
  ]
})
export class SharedDatabaseModule { }
