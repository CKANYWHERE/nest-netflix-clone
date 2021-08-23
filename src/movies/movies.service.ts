import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MoviesRepo } from './repo/movies.repo';
import { MovieContentsRepo } from './repo/movieContents.repo';
import { MulterFieldsRequest } from '../common/file/types/multer.types';
import { Connection } from 'typeorm';
@Injectable()
export class MoviesService {
  constructor(
    private movieRepo: MoviesRepo,
    private movieContentsRepo: MovieContentsRepo,
    private connection: Connection,
  ) {}

  async create(
    createMovieDto: CreateMovieDto,
    files: MulterFieldsRequest,
  ): Promise<CreateMovieDto> {
    const contentsArr = [];
    for (const file of createMovieDto.fileMap) {
      const parseMap = JSON.parse(file);
      const video = files.video.find((element) => {
        return element.originalname === parseMap.videoName;
      });
      const img = files.thumbNail.find((element) => {
        return element.originalname === parseMap.imgName;
      });
      console.log('video === ', video);
      console.log('img === ', img);
      // const content = {
      //   sectionOrder: parseMap.order,
      //   durationTime: parseMap.durTime,
      //   videoPath: parseMap.videoPath,
      //   thumbNailPath: parseMap.img
      // };
    }
    return null;
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
