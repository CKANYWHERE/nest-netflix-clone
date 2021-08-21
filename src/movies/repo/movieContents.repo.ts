import { EntityRepository, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { MovieContents } from '../../entity/movieContents.entity';

@Injectable()
@EntityRepository(MovieContents)
export class MovieContentsRepo extends Repository<MovieContents> {}
