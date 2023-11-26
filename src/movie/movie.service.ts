import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MovieService {

  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) { }

  async findAll(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const releaseYear = new Date(createMovieDto.releaseYear);

    const movieExists = await this.movieRepository.findOne({
      where: { title: createMovieDto.title },
    })

    if (movieExists) {
      throw new ConflictException('Filme já cadastrado');
    }

    if (isNaN(releaseYear.getTime())) {
      throw new BadRequestException(
        'Data de lançamento inválida. Certifique-se de que está no formato correto.',
      );
    }

    const movie = this.movieRepository.create({
      ...createMovieDto,
      releaseYear,
    });

    return await this.movieRepository.save(movie);
  }

  async findByTitle(title: string): Promise<Movie> {
    const similarMovies = await this.movieRepository
      .createQueryBuilder('movie')
      .where('movie.title ILIKE :title', { title: `%${title}%` })
      .take(1)
      .getMany();

    if (similarMovies.length === 0) {
      throw new NotFoundException(
        `Nenhum filme encontrado com base no título "${title}".`,
      );
    }

    return similarMovies[0];
  }

  async updateRating(
    title: string,
    updateRatingDto: UpdateRatingDto,
  ): Promise<Movie> {
    const movie = await this.findByTitle(title);

    if (!movie) {
      throw new NotFoundException(
        `Nenhum filme encontrado com o título ${title}.`,
      );
    }

    movie.rating = updateRatingDto.rating;

    return await this.movieRepository.save(movie);
  }

  async updateMovie(
    title: string,
    updateMovieDto: UpdateMovieDto,
  ): Promise<Movie> {
    const movie = await this.findByTitle(title);

    if (!movie) {
      throw new NotFoundException(
        `Nenhum filme encontrado com o título ${title}.`,
      );
    }

    Object.assign(movie, updateMovieDto);

    return await this.movieRepository.save(movie);
  }

  async remove(id: string): Promise<void> {
    const movie = await this.movieRepository.findOne({
      where: { id }
    });

    if (!movie) {
      throw new NotFoundException(`Nenhum filme encontrado com o ID ${id}.`);
    }

    await this.movieRepository.remove(movie);
  }
}
