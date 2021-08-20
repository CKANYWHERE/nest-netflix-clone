import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MovieCategory } from './movieCategory.entity';

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column()
  categoryName: string;

  @OneToMany(() => MovieCategory, (movieCategory) => movieCategory.category)
  movieCategory: MovieCategory[];
}
