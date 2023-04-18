import { Body, Controller, Post } from '@nestjs/common';
import { StartupsService } from './startups.service';

@Controller('startups')
export class StartupsController {
  constructor(private startupsService: StartupsService) {}

  @Post('create')
  create(@Body() body: { name: string; file: Buffer }) {
    return this.startupsService.create(body.name, body.file);
  }
}
