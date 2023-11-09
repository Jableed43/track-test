import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Track } from './track.interface';
import { TrackService } from './track.service';
@Controller('tracks')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}
  @Get()
  getTracks(): Promise<Track[]> {
    return this.trackService.getTracks();
  }
  @Get('/:id')
  async getTrackById(@Param('id') id: number): Promise<any> {
    return this.trackService.getTrackById(id);
  }
  @Post()
  createTrack(@Body() body): Promise<any> {
    return this.trackService.createTrack(body);
  }
  @Delete('/:id')
  deleteTrackById(@Param('id') id: number): Promise<void> {
    return this.trackService.deleteTrackById(id);
  }
  @Put('/:id')
  @HttpCode(204)
  updateTrackById(@Param('id') id: number, @Body() body): Promise<void> {
    return this.trackService.updateTrackById(id, body);
  }
}
