import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PacienteEntity } from './paciente.entity';

@Injectable()
export class PacienteService {
  constructor(
    @InjectRepository(PacienteEntity)
    private readonly pacienteRepository: Repository<PacienteEntity>,
  ) {}

  async findAll(): Promise<PacienteEntity[]> {
    return await this.pacienteRepository.find();
  }

  async findOne(id: string): Promise<PacienteEntity> {
    const paciente = await this.pacienteRepository.findOne({ where: { id } });
    if (!paciente) {
      throw new NotFoundException(`Paciente with ID ${id} not found`);
    }
    return paciente;
  }

  async create(paciente: PacienteEntity): Promise<PacienteEntity> {
    if (!paciente.nombre || paciente.nombre.length < 3) {
      throw new Error(
        'El nombre del paciente debe tener al menos 3 caracteres.',
      );
    }
    return await this.pacienteRepository.save(paciente);
  }

  async update(id: string, paciente: PacienteEntity): Promise<PacienteEntity> {
    const existingPaciente = await this.findOne(id);
    return await this.pacienteRepository.save({
      ...existingPaciente,
      ...paciente,
    });
  }

  async delete(id: string): Promise<void> {
    const paciente = await this.findOne(id);
    if (paciente.diagnosticos && paciente.diagnosticos.length > 0) {
      throw new Error(
        'No se puede eliminar un paciente con diagnósticos asociados.',
      );
    }
    await this.pacienteRepository.remove(paciente);
  }
}
