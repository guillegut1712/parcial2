import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicoEntity } from './medico.entity';

@Injectable()
export class MedicoService {
  constructor(
    @InjectRepository(MedicoEntity)
    private readonly medicoRepository: Repository<MedicoEntity>,
  ) {}

  async findAll(): Promise<MedicoEntity[]> {
    return await this.medicoRepository.find();
  }

  async findOne(id: string): Promise<MedicoEntity> {
    const medico = await this.medicoRepository.findOne({ where: { id } });
    if (!medico) {
      throw new NotFoundException(`Medico with ID ${id} not found`);
    }
    return medico;
  }

  async create(medico: MedicoEntity): Promise<MedicoEntity> {
    if (!medico.nombre || !medico.especialidad) {
      throw new Error('El nombre y la especialidad son obligatorios.');
    }
    return await this.medicoRepository.save(medico);
  }

  async update(id: string, medico: MedicoEntity): Promise<MedicoEntity> {
    const existingMedico = await this.findOne(id); // Llama a findOne para validar si existe
    return await this.medicoRepository.save({ ...existingMedico, ...medico });
  }

  async delete(id: string): Promise<void> {
    const medico = await this.findOne(id);
    if (medico.pacientes && medico.pacientes.length > 0) {
      throw new Error(
        'No se puede eliminar un médico con pacientes asociados.',
      );
    }
    await this.medicoRepository.remove(medico);
  }
}
