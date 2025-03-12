import { Module } from '@nestjs/common';
import { MONGO_CONFIG } from './config/db.config';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    JwtModule.register({
      secret: 'jwtConstants12werew',
      signOptions: { expiresIn: '1d' },
    }),
    ...MONGO_CONFIG,
  ],
  exports: [
    JwtModule,
    ...MONGO_CONFIG
  ]
})
export class SharedModule { }
