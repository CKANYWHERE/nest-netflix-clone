import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { UploadFile } from '../common/file/uploadFile';
import * as Http from 'http';

@Controller('movies')
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly uploadFile: UploadFile,
  ) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'video', maxCount: 10 },
      { name: 'thumbNail', maxCount: 10 },
    ]),
  )
  async create(
    @Body() createMovieDto: CreateMovieDto,
    @UploadedFiles() files: Express.Multer.File[],
    @Res() res,
  ) {
    const fileArray = await this.uploadFile.uploadFields(files);
    if (fileArray) {
      const body = await this.moviesService.create(createMovieDto, fileArray);
      return res.status(HttpStatus.CREATED).json({
        message: 'CREATED',
        body: body,
      });
    } else {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'FILE_NOT_INCLUDED',
      });
    }
  }

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(+id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.remove(+id);
  }

  /* Test For File Upload
  @Post('uploadSingleFile')
  @UseInterceptors(FileInterceptor('file'))
  postSingleVideo(@UploadedFile() file: Express.Multer.File, @Req() req) {
    return this.uploadFile.uploadSingle(file);
  }

  @Post('uploadArrayFile')
  @UseInterceptors(FilesInterceptor('files'))
  postArrayVideo(@UploadedFiles() files: Express.Multer.File[], @Req() req) {
    return this.uploadFile.uploadArray(files);
  }

  @Post('uploadFileFields')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'file1', maxCount: 1 },
      { name: 'file2', maxCount: 1 },
      { name: 'file3', maxCount: 1 },
    ]),
  )
  postFieldsVideo(@UploadedFiles() files: Express.Multer.File[], @Req() req) {
    return this.uploadFile.uploadFields(files);
  }
 */
}
