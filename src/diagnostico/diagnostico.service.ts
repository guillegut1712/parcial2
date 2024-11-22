import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiagnosticoEntity } from './diagnostico.entity';

@Injectable()
export class DiagnosticoService {
  constructor(
    @InjectRepository(DiagnosticoEntity)
    private readonly diagnosticoRepository: Repository<DiagnosticoEntity>,
  ) {}

  async findAll(): Promise<DiagnosticoEntity[]> {
    return await this.diagnosticoRepository.find();
  }

  async findOne(id: string): Promise<DiagnosticoEntity> {
    const diagnostico = await this.diagnosticoRepository.findOne({
      where: { id },
    });
    if (!diagnostico) {
      throw new NotFoundException(`Diagnostico with ID ${id} not found`);
    }
    return diagnostico;
  }

  async create(diagnostico: DiagnosticoEntity): Promise<DiagnosticoEntity> {
    if (!diagnostico.nombre || diagnostico.descripcion.length > 200) {
      throw new Error(
        'La descripción del diagnóstico debe tener máximo 200 caracteres.',
      );
    }
    return await this.diagnosticoRepository.save(diagnostico);
  }

  async update(
    id: string,
    diagnostico: DiagnosticoEntity,
  ): Promise<DiagnosticoEntity> {
    const existingDiagnostico = await this.findOne(id);
    return await this.diagnosticoRepository.save({
      ...existingDiagnostico,
      ...diagnostico,
    });
  }

  async delete(id: string): Promise<void> {
    const diagnostico = await this.findOne(id);
    await this.diagnosticoRepository.remove(diagnostico);
  }
}
