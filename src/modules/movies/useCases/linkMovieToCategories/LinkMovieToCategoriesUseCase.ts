import { Category } from '@modules/categories/infra/typeorm/entities/Category';
import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';
import { Movie } from '@modules/movies/infra/typeorm/entities/Movie';
import { IMoviesRepository } from '@modules/movies/repositories/IMoviesRepository';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/error/AppError';

import { ILinkMovieToCategoriesDTO } from './ILinkMovieToCategoriesDTO';

@injectable()
class LinkMovieToCategoriesUseCase {
  constructor(
    @inject('MoviesRepository')
    private moviesRepository: IMoviesRepository,

    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({
    categories_ids,
    movie_id,
  }: ILinkMovieToCategoriesDTO): Promise<Movie> {
    const movie = await this.moviesRepository.findById(movie_id);

    if (!movie) {
      throw new AppError('This movie does not exist', 404);
    }

    const categories = await this.categoriesRepository.getCategoriesById(
      categories_ids,
    );

    if (!categories) {
      throw new AppError('The reported categoires do note exist', 404);
    }

    const categoiresAdd = categories
      .concat(movie.categories)
      .reduce((acc, current) => {
        const category = acc.find(item => item.id === current.id);
        if (!category) {
          return acc.concat([current]);
        }
        return acc;
      }, [] as Category[]);

    movie.categories = categoiresAdd;

    this.moviesRepository.save(movie);

    return movie;
  }
}

export { LinkMovieToCategoriesUseCase };
