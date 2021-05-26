import { Category } from '@modules/categories/infra/typeorm/entities/Category';
import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute(): Promise<Category[] | undefined> {
    const categories = await this.categoriesRepository.getAll();

    return categories;
  }
}

export { ListCategoriesUseCase };
