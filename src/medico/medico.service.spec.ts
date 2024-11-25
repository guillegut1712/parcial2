import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicoService } from './medico.service';
import { MedicoEntity } from './medico.entity';

describe('MedicoService', () => {
  let service: MedicoService;
  let repository: Repository<MedicoEntity>;

  const mockMedicoRepository = {
    find: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockResolvedValue(null),
    save: jest.fn().mockResolvedValue({
      id: '1',
      nombre: 'Test Medico',
      especialidad: 'Test Especialidad',
    }),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MedicoService,
        {
          provide: getRepositoryToken(MedicoEntity),
          useValue: mockMedicoRepository,
        },
      ],
    }).compile();

    service = module.get<MedicoService>(MedicoService);
    repository = module.get<Repository<MedicoEntity>>(
      getRepositoryToken(MedicoEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all medicos', async () => {
    expect(await service.findAll()).toEqual([]);
    expect(repository.find).toHaveBeenCalled();
  });

  it('should throw NotFoundException when medico not found', async () => {
    await expect(service.findOne('invalid-id')).rejects.toThrowError(
      'Medico with ID invalid-id not found',
    );
    expect(repository.findOne).toHaveBeenCalled();
  });

  it('should create a medico', async () => {
    const newMedico = {
      nombre: 'Test',
      especialidad: 'Test Especialidad',
    } as MedicoEntity;
    expect(await service.create(newMedico)).toEqual({
      id: '1',
      nombre: 'Test Medico',
      especialidad: 'Test Especialidad',
    });
    expect(repository.save).toHaveBeenCalled();
  });
});
