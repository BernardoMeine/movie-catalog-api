import {
  Controller,
  Post,
  Get,
  Body,
  ValidationPipe,
  NotFoundException,
  Param,
  Patch,
  Put,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './movie.entity';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ApiTags } from '@nestjs/swagger';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@ApiTags('movies')
@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) { }

  @Post()
  async createMovie(
    @Body(new ValidationPipe()) createMovieDto: CreateMovieDto,
  ) {
    return this.movieService.create(createMovieDto);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60)
  @Get('title/:title')
  async getMovieByTitle(@Param('title') title: string): Promise<Movie> {
    try {
      return await this.movieService.findByTitle(title);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(
          `Nenhum filme encontrado com o título "${title}".`,
        );
      }
      throw error;
    }
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60)
  @Get()
  findAll(): Promise<Movie[]> {
    return this.movieService.findAll();
  }

  @Patch(':title/rating')
  async updateRating(
    @Param('title') title: string,
    @Body() updateRatingDto: UpdateRatingDto,
  ) {
    return this.movieService.updateRating(title, updateRatingDto);
  }

  @Put(':title')
  async updateMovie(
    @Param('title') title: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    try {
      const updatedMovie = await this.movieService.updateMovie(
        title,
        updateMovieDto,
      );
      return updatedMovie;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Filme não encontrado', error.message);
      }
      throw error;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieService.remove(id);
  }
}
