import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { DatabaseConfig } from './core/database/database.config';
import * as Joi from 'joi';
import envSchema from '@constants/env-schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
      validationSchema: Joi.object(envSchema),
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
    }),
    SequelizeModule.forRootAsync({
      useClass: DatabaseConfig,
    }),
  ],
  providers: [],
})
export class AppModule {}
