import { Category } from '@modules/categories/infra/typeorm/entities/Category';
import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';
import { inject, injectable } from 'tsyringe';

import { ICreateCategoryDTO } from './ICreateCategoryDTO';

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({ description }: ICreateCategoryDTO): Promise<Category> {
    const descriptionNormalized =
      description.charAt(0).toUpperCase() +
      description.toLocaleLowerCase().slice(1);

    const category = await this.categoriesRepository.create({
      description: descriptionNormalized,
    });

    return category;
  }
}

export { CreateCategoryUseCase };
