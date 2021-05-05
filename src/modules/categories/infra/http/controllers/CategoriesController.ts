import { CreateCategoryUseCase } from '@modules/categories/useCases/createCategory/CreateCategoryUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class CategoriesController {
  async create(request: Request, response: Response) {
    const { description } = request.body;
    const createCategory = container.resolve(CreateCategoryUseCase);
    const category = await createCategory.execute({
      description,
    });

    response.json(category).send(201);
  }
}

export { CategoriesController };
