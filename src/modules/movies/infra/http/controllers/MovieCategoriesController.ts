import { LinkMovieToCategoriesUseCase } from '@modules/movies/useCases/linkMovieToCategories/LinkMovieToCategoriesUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class MovieCategoriesController {
  async create(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { categories_ids } = request.body;

    const linkMoviesToCategoriesUseCase = container.resolve(
      LinkMovieToCategoriesUseCase,
    );

    const movie = await linkMoviesToCategoriesUseCase.execute({
      categories_ids,
      movie_id: id,
    });

    return response.json(movie).status(201).send();
  }
}

export { MovieCategoriesController };
