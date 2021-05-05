import { Category } from '../infra/typeorm/entities/Category';
import { ICreateCategoryDTO } from '../useCases/createCategory/ICreateCategoryDTO';

export interface ICategoriesRepository {
  create: (data: ICreateCategoryDTO) => Promise<Category>;
  findById: (category_id: string) => Promise<Category | undefined>;
  save: (category: Category) => Promise<Category>;
  getCategoriesById: (
    categories_ids: string[],
  ) => Promise<Category[] | undefined>;
}
