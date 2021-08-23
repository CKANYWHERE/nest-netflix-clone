import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MovieContents } from './movieContents.entity';
import { MovieCategory } from './movieCategory.entity';

@Entity()
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column()
  movieName: string;

  @Column()
  like: number;

  @Column()
  dislike: number;

  @Column()
  subTitle: string;

  @CreateDateColumn()
  regDate: Date;

  @OneToMany(() => MovieContents, (movieContents) => movieContents.movie)
  movieContents: MovieContents[];

  @OneToMany(() => MovieCategory, (movieCategory) => movieCategory.movie)
  categories: MovieCategory[];
}
