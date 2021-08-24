import { Connection, EntityRepository, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Movie } from '../../entity/movie.entity';
import { MovieContents } from '../../entity/movieContents.entity';

@Injectable()
@EntityRepository(Movie)
export class MoviesRepo extends Repository<Movie> {
  async insertMovie(
    connection: Connection,
    contents: MovieContents[],
    movie: Movie,
  ) {
    let status = 'INSERTED';
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(movie);
      await queryRunner.manager.save(contents);
      await queryRunner.commitTransaction();
    } catch (e) {
      status = 'ROLLBACK';
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
      return {
        status: status,
      };
    }
  }
}
