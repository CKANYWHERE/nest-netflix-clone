import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Movie } from './movie.entity';

@Entity()
export class MovieCategory extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @ManyToOne(() => Category, (category) => category.movieCategory)
  @JoinColumn({ name: 'categoryUid', referencedColumnName: 'uid' })
  category: Category;

  @ManyToOne(() => Movie, (movie) => movie.categories)
  @JoinColumn({ name: 'movieUid', referencedColumnName: 'uid' })
  movie: Movie;
}
