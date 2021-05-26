import { CreateCategoryUseCase } from '@modules/categories/useCases/createCategory/CreateCategoryUseCase';
import { ListCategoriesUseCase } from '@modules/categories/useCases/listCategories/ListCategoriesUseCase';
import { Request, Response } from 'express';
import { autoInjectable, container } from 'tsyringe';

class CategoriesController {
  async create(request: Request, response: Response): Promise<Response> {
    const { description } = request.body;
    const createCategory = container.resolve(CreateCategoryUseCase);
    const category = await createCategory.execute({
      description,
    });

    return response.json(category).send(201);
  }

  async read(request: Request, response: Response): Promise<Response> {
    const listCategories = container.resolve(ListCategoriesUseCase);
    const categories = await listCategories.execute();

    return response.json(categories).send();
  }
}

export { CategoriesController };
