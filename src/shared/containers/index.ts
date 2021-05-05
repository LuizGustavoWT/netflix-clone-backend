import { CategoriesRepository } from '@modules/categories/infra/typeorm/repositories/CategoriesRepository';
import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';
import { MoviesRepository } from '@modules/movies/infra/typeorm/repositories/MoviesRepository';
import { IMoviesRepository } from '@modules/movies/repositories/IMoviesRepository';
import { container } from 'tsyringe';

import './providers';

container.registerSingleton<IMoviesRepository>(
  'MoviesRepository',
  MoviesRepository,
);

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);
