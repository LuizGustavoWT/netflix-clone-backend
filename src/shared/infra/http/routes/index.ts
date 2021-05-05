import { categoriesRouter } from '@modules/categories/infra/http/routes/categories.routes';
import { moviesRouter } from '@modules/movies/infra/http/routes/movies.routes';
import { Router } from 'express';

const router = Router();

router.use('/movies', moviesRouter);

router.use('/categories', categoriesRouter);

export { router };
