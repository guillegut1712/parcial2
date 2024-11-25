import { Test, TestingModule } from '@nestjs/testing';
import { PacienteMedicoService } from './paciente-medico.service';
import { PacienteService } from '../paciente/paciente.service';
import { MedicoService } from '../medico/medico.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PacienteEntity } from '../paciente/paciente.entity';

describe('PacienteMedicoService', () => {
  let service: PacienteMedicoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PacienteMedicoService,
        {
          provide: PacienteService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: MedicoService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(PacienteEntity),
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PacienteMedicoService>(PacienteMedicoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
