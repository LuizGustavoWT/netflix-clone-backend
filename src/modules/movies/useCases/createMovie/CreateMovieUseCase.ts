import uploads from '@config/uploads';
import { Movie } from '@modules/movies/infra/typeorm/entities/Movie';
import { IMoviesRepository } from '@modules/movies/repositories/IMoviesRepository';
import { inject, injectable } from 'tsyringe';

import { IStorageProvider } from '@shared/containers/providers/StorageProvider/models/IStorageProvider';

import { ICreateMovieDTO } from './ICreateMovieDTO';

@injectable()
class CreateMovieUseCase {
  constructor(
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('MoviesRepository')
    private moviesRepository: IMoviesRepository,
  ) {}

  public async execute({
    title,
    backdropPath,
    moviePath,
    posterPath,
  }: ICreateMovieDTO): Promise<Movie> {
    const movie = await this.storageProvider.saveFile(
      moviePath,
      process.env.BUCKET_VIDEOS_NAME,
    );

    const backdrop = await this.storageProvider.saveFile(
      backdropPath,
      process.env.BUCKET_BACKDROP_NAME,
    );

    const poster = await this.storageProvider.saveFile(
      posterPath,
      process.env.BUCKET_POSTER_NAME,
    );

    const newMovie = await this.moviesRepository.create({
      moviePath: movie,
      posterPath: poster,
      backdropPath: backdrop,
      title,
    });

    return newMovie;
  }
}

export { CreateMovieUseCase };
