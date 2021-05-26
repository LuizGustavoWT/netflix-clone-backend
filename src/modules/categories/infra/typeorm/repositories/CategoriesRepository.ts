import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';
import { ICreateCategoryDTO } from '@modules/categories/useCases/createCategory/ICreateCategoryDTO';
import { getRepository, In, Repository } from 'typeorm';

import { Category } from '../entities/Category';

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async findById(category_id: string): Promise<Category | undefined> {
    return this.repository.findOne(category_id);
  }

  async create({ description }: ICreateCategoryDTO): Promise<Category> {
    const movie = this.repository.create({ description });

    return this.save(movie);
  }

  async save(movie: Category): Promise<Category> {
    return this.repository.save(movie);
  }

  async getCategoriesById(
    categories_ids: string[],
  ): Promise<Category[] | undefined> {
    const categories = await this.repository.find({
      where: { id: In(categories_ids) },
    });

    return categories;
  }

  async getAll(): Promise<Category[]> {
    const categories = this.repository.find();

    return categories;
  }
}

export { CategoriesRepository };
