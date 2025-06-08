import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import {
  BadRequestException,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import fastifyHelmet from '@fastify/helmet';
import fastifyCsrf from '@fastify/csrf-protection';
import configData from '@constants/config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      bodyLimit: 90000000,
      trustProxy: true,
    }),
    {
      rawBody: true,
      bodyParser: true,
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        return new BadRequestException(
          errors.map((err) => ({
            property: err.property,
            constraints: Object.values(err.constraints || {}).join(', '),
          })),
        );
      },
    }),
  );

  app.enableVersioning({ type: VersioningType.URI });

  await app.register(fastifyHelmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`, 'fonts.googleapis.com'],
        fontSrc: [`'self'`, 'fonts.gstatic.com'],
        imgSrc: [`'self'`, 'data:'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  });

  await app.register(fastifyCsrf, { cookieOpts: { signed: true } });

  app.enableCors({
    allowedHeaders: [
      'Origin',
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Credentials',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
    ],
    origin: '*',
    methods: ['HEAD', 'OPTIONS', 'GET', 'PUT', 'POST', 'DELETE'],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Airtribe Hackathon Server')
    .setDescription('irtribe Hackathon Server')
    .setVersion('v1.0.0')
    .build();

  const doucment = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, doucment);

  await app.listen(
    {
      host: '0.0.0.0',
      port: configData.PORT || 4004,
    },
    (err: Error | null, address: string) => {
      console.log('SERVER ON', address);
    },
  );
}
bootstrap();
