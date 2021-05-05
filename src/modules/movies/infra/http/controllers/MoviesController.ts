import { CreateMovieUseCase } from '@modules/movies/useCases/createMovie/CreateMovieUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class MoviesController {
  async create(request: Request, response: Response) {
    const { title } = request.body;
    const movie = request.files.movie[0].filename;
    const poster = request.files.poster[0].filename;
    const backdrop = request.files.backdrop[0].filename;

    const createMovieUseCase = container.resolve(CreateMovieUseCase);

    const addMovie = await createMovieUseCase.execute({
      backdropPath: backdrop,
      moviePath: movie,
      posterPath: poster,
      title,
    });

    response.json({ ok: addMovie }).send();
  }
}

export { MoviesController };
