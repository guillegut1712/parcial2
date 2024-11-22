import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PacienteService } from './paciente.service';
import { PacienteEntity } from './paciente.entity';

describe('PacienteService', () => {
  let service: PacienteService;
  let repository: Repository<PacienteEntity>;

  const mockPacienteRepository = {
    find: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockResolvedValue(null),
    save: jest
      .fn()
      .mockResolvedValue({ id: '1', nombre: 'Paciente Prueba', genero: 'F' }),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PacienteService,
        {
          provide: getRepositoryToken(PacienteEntity),
          useValue: mockPacienteRepository,
        },
      ],
    }).compile();

    service = module.get<PacienteService>(PacienteService);
    repository = module.get<Repository<PacienteEntity>>(
      getRepositoryToken(PacienteEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all pacientes', async () => {
    expect(await service.findAll()).toEqual([]);
    expect(repository.find).toHaveBeenCalled();
  });

  it('should throw NotFoundException when paciente not found', async () => {
    await expect(service.findOne('invalid-id')).rejects.toThrowError(
      'Paciente with ID invalid-id not found',
    );
    expect(repository.findOne).toHaveBeenCalled();
  });

  it('should create a paciente', async () => {
    const newPaciente = {
      nombre: 'Paciente Test',
      genero: 'F',
    } as PacienteEntity;
    expect(await service.create(newPaciente)).toEqual({
      id: '1',
      nombre: 'Paciente Prueba',
      genero: 'F',
    });
    expect(repository.save).toHaveBeenCalled();
  });
});
