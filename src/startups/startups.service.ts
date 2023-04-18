import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma.service';
import { S3Service } from '../shared/s3.service';
import { randomUUID } from 'node:crypto';

@Injectable()
export class StartupsService {
  constructor(private prisma: PrismaService, private s3: S3Service) {}

  async create(name: string, thumbnail: Buffer) {
    const filename = randomUUID();

    const startup = await this.prisma.startup.findFirst({
      where: {
        name,
      },
    });

    if (startup) {
      throw new Error('Nome de startup já existe');
    }

    await this.s3.uploadFile('some', filename, thumbnail, 'read', 'image/png');

    return await this.prisma.startup.create({
      data: {
        id: randomUUID(),
        name,
        thumbnailPath: filename,
      },
    });
  }
}
