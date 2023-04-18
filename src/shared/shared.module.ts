import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { S3Service } from './s3.service';

@Global()
@Module({
  providers: [PrismaService, S3Service],
  exports: [PrismaService, S3Service],
})
export class SharedModule {}
