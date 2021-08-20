import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Movie } from './movie.entity';

@Entity()
export class MovieContents extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column()
  sectionOrder: number;

  @Column()
  durationTime: number;

  @Column()
  videoPath: string;

  @Column()
  thumbNailPath: string;

  @Column()
  sectionTitle: string;

  @Column()
  sectionSubTitle: string;

  @CreateDateColumn()
  regDate: Date;

  @ManyToOne(() => Movie, (movie) => movie.movieContents)
  @JoinColumn({ name: 'movieUuid', referencedColumnName: 'uid' })
  movie: Movie;
}
