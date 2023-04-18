import { PrismaService } from '../shared/prisma.service';
import { S3Service } from '../shared/s3.service';
import { StartupsService } from './startups.service';
import { TestingModule, Test } from '@nestjs/testing';

const prismaMock = {
  startup: {
    create: jest.fn(),
    findFirst: jest.fn(),
  },
};

const s3Mock = {
  uploadFile: jest.fn(),
};

describe('Startups Service Unit Tests', () => {
  let sut: StartupsService;
  let prismaService: PrismaService;
  let s3Service: S3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StartupsService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
        {
          provide: S3Service,
          useValue: s3Mock,
        },
      ],
    }).compile();

    sut = module.get<StartupsService>(StartupsService);
    prismaService = module.get(PrismaService);
    s3Service = module.get(S3Service);
  });

  afterEach(() => jest.clearAllMocks());

  it('should create an startup', async () => {
    jest.spyOn(prismaService.startup, 'findFirst').mockResolvedValue(null);
    jest.spyOn(prismaService.startup, 'create').mockResolvedValue({
      id: '654321',
      name: 'Neon',
      thumbnailPath: '5562156511.png',
    });

    const res = await sut.create('Neon', Buffer.from('BLABLABLA'));

    expect(prismaService.startup.findFirst).toBeCalledTimes(1);
    expect(s3Service.uploadFile).toBeCalledTimes(1);
    expect(prismaService.startup.create).toBeCalledTimes(1);
    expect(res.name).toBe('Neon');
  });
});
