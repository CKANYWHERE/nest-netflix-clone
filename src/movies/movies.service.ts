import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MoviesRepo } from './repo/movies.repo';
import { MovieContentsRepo } from './repo/movieContents.repo';
import {
  MulterFieldsRequest,
  MulterPipeLine,
} from '../common/file/types/multer.types';
import { Connection } from 'typeorm';
import { MovieContents } from '../entity/movieContents.entity';
import { MoviesFunction } from './common/movies.function';
@Injectable()
export class MoviesService {
  constructor(
    private functions: MoviesFunction,
    private movieRepo: MoviesRepo,
    private movieContentsRepo: MovieContentsRepo,
    private connection: Connection,
  ) {}

  async create(
    createMovieDto: CreateMovieDto,
    files: MulterPipeLine,
  ): Promise<{ status: string }> {
    return await this.movieRepo.insertMovie(
      this.connection,
      this.functions.makeContents(createMovieDto, files),
      this.functions.makeMovie(createMovieDto),
    );
  }

  findAll() {
    return `This action returns all movies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} movie`;
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
