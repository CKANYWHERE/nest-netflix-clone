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
  Req,
  UploadedFile,
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

@Controller('movies')
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly uploadFile: UploadFile,
  ) {}

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
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
