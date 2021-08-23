import { Connection, EntityRepository, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Movie } from '../../entity/movie.entity';

@Injectable()
@EntityRepository(Movie)
export class MoviesRepo extends Repository<Movie> {
  async insertMovie(connection: Connection) {
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(Movie)
        .values({});
    } catch (e) {
      await queryRunner.rollbackTransaction();
      return null;
    } finally {
      await queryRunner.release();
    }
  }
}
