import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, Min, Max } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({
    description:
      'O título que identifica o filme',
    example: 'Vingadores: Ultimato',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description:
      'Descrição do filme, como uma breve sinopse',
    example: 'As branquelas, filme de comédia com pitadas de ação sobre dois agentes do fbi que precisam se disfarçar como duas socialites loiras para desvendar um crime',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description:
      'Data de estréia do filme',
    example: '01/12/2017',
  })
  @IsNotEmpty()
  @IsString()
  releaseYear: string;

  @ApiProperty({
    description:
      'Nome do diretor do filme',
    example: 'Martin Scorcese',
  })
  @IsNotEmpty()
  @IsString()
  director: string;

  @ApiProperty({
    description:
      'O gênero serve para subdividir o filme em categorias de acordo com o tipo de temática/teor',
    example: 'Ação',
  })
  @IsNotEmpty()
  @IsString()
  genre: string;

  @ApiProperty({
    description:
      'Nota do filme, onde ele pode ser classificado como 1 (bem ruim), até 5 (excelente)',
    example: 4,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;
}
