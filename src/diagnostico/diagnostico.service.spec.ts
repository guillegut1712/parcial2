import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiagnosticoService } from './diagnostico.service';
import { DiagnosticoEntity } from './diagnostico.entity';

describe('DiagnosticoService', () => {
  let service: DiagnosticoService;
  let repository: Repository<DiagnosticoEntity>;

  const mockDiagnosticoRepository = {
    find: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockResolvedValue(null),
    save: jest.fn().mockResolvedValue({
      id: '1',
      nombre: 'Diagnostico Prueba',
      descripcion: 'Descripción corta',
    }),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DiagnosticoService,
        {
          provide: getRepositoryToken(DiagnosticoEntity),
          useValue: mockDiagnosticoRepository,
        },
      ],
    }).compile();

    service = module.get<DiagnosticoService>(DiagnosticoService);
    repository = module.get<Repository<DiagnosticoEntity>>(
      getRepositoryToken(DiagnosticoEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all diagnosticos', async () => {
    expect(await service.findAll()).toEqual([]);
    expect(repository.find).toHaveBeenCalled();
  });

  it('should throw NotFoundException when diagnostico not found', async () => {
    await expect(service.findOne('invalid-id')).rejects.toThrowError(
      'Diagnostico with ID invalid-id not found',
    );
    expect(repository.findOne).toHaveBeenCalled();
  });

  it('should create a diagnostico', async () => {
    const newDiagnostico = {
      nombre: 'Diagnóstico Test',
      descripcion: 'Descripción corta',
    } as DiagnosticoEntity;
    expect(await service.create(newDiagnostico)).toEqual({
      id: '1',
      nombre: 'Diagnostico Prueba',
      descripcion: 'Descripción corta',
    });
    expect(repository.save).toHaveBeenCalled();
  });
});
