import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  welcomeToTheApp(): string {
    return 'Bem vindo a API movie_catalog, crie um usuário e faça login para poder usufruir da aplicação!';
  }
}
