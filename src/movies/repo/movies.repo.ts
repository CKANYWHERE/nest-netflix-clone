import { EntityRepository, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Movie } from '../../entity/movie.entity';

@Injectable()
@EntityRepository(Movie)
export class MoviesRepo extends Repository<Movie> {}
