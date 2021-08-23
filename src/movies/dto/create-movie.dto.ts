import { MulterFieldsRequest } from '../../common/file/types/multer.types';

export class CreateMovieDto {
  readonly movieName: string;
  readonly subTitle: string;
  readonly fileMap: [string];
}
