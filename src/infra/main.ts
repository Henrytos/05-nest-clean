import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from './env/env.service';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const env = app.get(EnvService);
  const port = env.get('PORT');

  const config = new DocumentBuilder()
    .setTitle('nest clean')
    .setDescription('nest clean api description endpoints')
    .setVersion('1.0')
    .addTag('forum')
    .build();

  const options: SwaggerDocumentOptions = {};

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document, {
    jsonDocumentUrl: 'api/json',
  });

  await app.listen(port);
}

bootstrap();
