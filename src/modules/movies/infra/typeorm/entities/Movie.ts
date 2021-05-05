import { Category } from '@modules/categories/infra/typeorm/entities/Category';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('movies')
class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  posterPath: string;

  @Column()
  backdropPath: string;

  @Column()
  moviePath: string;

  @Column()
  isAdult: boolean;

  @ManyToMany(() => Category, category => category.movies)
  @JoinTable({
    name: 'movies_categories',
    joinColumns: [{ name: 'movieId' }],
    inverseJoinColumns: [{ name: 'categoryId' }],
  })
  categories: Category[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Movie };
