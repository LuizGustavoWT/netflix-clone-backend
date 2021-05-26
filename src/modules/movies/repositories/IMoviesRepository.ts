import { Category } from '@modules/categories/infra/typeorm/entities/Category';

import { Movie } from '../infra/typeorm/entities/Movie';
import { ICreateMovieDTO } from '../useCases/createMovie/ICreateMovieDTO';

export interface IMoviesRepository {
  create: (data: ICreateMovieDTO) => Promise<Movie>;
  findById: (movie_id: string) => Promise<Movie | undefined>;
  save: (movie: Movie) => Promise<Movie>;
  getMoviesByCategory: (category_id: string) => Promise<Movie[]>;
}
