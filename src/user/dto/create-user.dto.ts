import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description:
      'O nome é utilizado para exibir dados no perfil do usuário e identificá-lo',
    example: 'Fulano De tal',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description:
      'O E-mail irá servir para efetuar o login do usuário',
    example: 'email@email.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description:
      'a senha é utilizada para garantir que apenas o usuário vai conseguir acessar a própria conta',
    example: 'Foo@Bar123',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'senha muito fraca',
  })
  password: string;
}
