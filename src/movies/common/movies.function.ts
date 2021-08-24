import { Injectable } from '@nestjs/common';
import { MovieContents } from '../../entity/movieContents.entity';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { MulterPipeLine } from '../../common/file/types/multer.types';
import { Movie } from '../../entity/movie.entity';

@Injectable()
export class MoviesFunction {
  makeContents(createMovieDto: CreateMovieDto, files: MulterPipeLine) {
    const contentsArr: MovieContents[] = [];
    for (const file of createMovieDto.fileMap) {
      const parseMap = JSON.parse(file);
      const video = files.video.find((element) => {
        return element.originalname === parseMap.videoName;
      });
      const img = files.thumbNail.find((element) => {
        return element.originalname === parseMap.imgName;
      });
      const content: MovieContents = new MovieContents();
      content.sectionOrder = parseMap.order;
      content.durationTime = parseMap.durTime;
      content.videoPath = video.path;
      content.thumbNailPath = img.path;
      content.sectionTitle = parseMap.title;
      content.sectionSubTitle = parseMap.subTitle;
      contentsArr.push(content);
    }
    return contentsArr;
  }

  makeMovie(createMovieDto: CreateMovieDto) {
    const movie = new Movie();
    movie.movieName = createMovieDto.movieName;
    movie.subTitle = createMovieDto.subTitle;
    movie.like = 0;
    movie.dislike = 0;
    return movie;
  }
}
