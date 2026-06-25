import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// pipe verifica se antes da requisicao entrar no conroller ela tem algum erro
// valida os dados da requisição antes de chegarem ao controller
async function bootstrap() {


  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

