import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PacienteEntity } from '../paciente/paciente.entity';
import { PacienteService } from '../paciente/paciente.service';
import { MedicoEntity } from '../medico/medico.entity';
import { MedicoService } from '../medico/medico.service';

@Injectable()
export class PacienteMedicoService {
  constructor(
    private readonly pacienteService: PacienteService,
    private readonly medicoService: MedicoService,
    @InjectRepository(PacienteEntity)
    private readonly pacienteRepository: Repository<PacienteEntity>,
  ) {}

  async findMedicosByPacienteId(pacienteId: string): Promise<MedicoEntity[]> {
    const paciente = await this.pacienteService.findOne(pacienteId);

    if (!paciente) {
      throw new Error(`Paciente con ID ${pacienteId} no encontrado.`);
    }

    return paciente.medicos;
  }

  async addMedicoToPaciente(
    pacienteId: string,
    medicoId: string,
  ): Promise<void> {
    const paciente = await this.pacienteService.findOne(pacienteId);
    const medico = await this.medicoService.findOne(medicoId);

    if (!paciente) {
      throw new Error(`Paciente con ID ${pacienteId} no encontrado.`);
    }

    if (!medico) {
      throw new Error(`Médico con ID ${medicoId} no encontrado.`);
    }

    if (paciente.medicos.length >= 5) {
      throw new Error('Un paciente no puede tener más de 5 médicos.');
    }

    paciente.medicos.push(medico);
    await this.pacienteRepository.save(paciente);
  }
}
