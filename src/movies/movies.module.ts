import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesRepo } from './repo/movies.repo';
import { MovieContentsRepo } from './repo/movieContents.repo';
import { UploadFile } from '../common/file/uploadFile';
import { MoviesFunction } from './common/movies.function';

@Module({
  imports: [TypeOrmModule.forFeature([MoviesRepo, MovieContentsRepo])],
  controllers: [MoviesController],
  providers: [MoviesService, UploadFile, MoviesFunction],
})
export class MoviesModule {}
