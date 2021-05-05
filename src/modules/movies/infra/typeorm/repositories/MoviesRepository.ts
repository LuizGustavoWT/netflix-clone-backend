import { Category } from '@modules/categories/infra/typeorm/entities/Category';
import { IMoviesRepository } from '@modules/movies/repositories/IMoviesRepository';
import { ICreateMovieDTO } from '@modules/movies/useCases/createMovie/ICreateMovieDTO';
import { getRepository, Repository } from 'typeorm';

import { Movie } from '../entities/Movie';

class MoviesRepository implements IMoviesRepository {
  private repository: Repository<Movie>;

  constructor() {
    this.repository = getRepository(Movie);
  }

  async findById(movie_id: string): Promise<Movie | undefined> {
    console.log(movie_id);
    return this.repository.findOne({
      where: { id: movie_id },
      relations: ['categories'],
    });
  }

  async create({
    backdropPath,
    moviePath,
    posterPath,
    title,
  }: ICreateMovieDTO): Promise<Movie> {
    const movie = this.repository.create({
      backdropPath,
      title,
      posterPath,
      moviePath,
    });

    return this.save(movie);
  }

  async save(movie: Movie): Promise<Movie> {
    return this.repository.save(movie);
  }
}

export { MoviesRepository };
