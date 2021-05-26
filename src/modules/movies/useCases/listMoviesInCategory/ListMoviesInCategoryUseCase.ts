import { Movie } from '@modules/movies/infra/typeorm/entities/Movie';
import { IMoviesRepository } from '@modules/movies/repositories/IMoviesRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListMoviesInCategoryUseCase {
  constructor(
    @inject('MoviesRepository')
    private moviesRepository: IMoviesRepository,
  ) {}

  async execute(category_id: string): Promise<Movie[]> {
    const movies = await this.moviesRepository.getMoviesByCategory(category_id);

    const moviesRet = movies.reduce((acc, value) => {
      const hasCategory = value.categories.find(
        category => category_id === category.id,
      );
      if (hasCategory) {
        acc.push(value);
      }
      return acc;
    }, [] as Movie[]);

    return moviesRet;
  }
}

export { ListMoviesInCategoryUseCase };
