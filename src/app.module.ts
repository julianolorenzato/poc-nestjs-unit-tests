import { Module } from '@nestjs/common';
import { StartupsModule } from './startups/startups.module';
import { SharedModule } from './shared/shared.module';
@Module({
  imports: [StartupsModule, SharedModule],
})
export class AppModule {}
