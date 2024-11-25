import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteMedicoService } from './paciente-medico.service';
import { PacienteEntity } from '../paciente/paciente.entity';
import { MedicoEntity } from '../medico/medico.entity';
import { PacienteService } from '../paciente/paciente.service';
import { MedicoService } from '../medico/medico.service';

@Module({
  imports: [TypeOrmModule.forFeature([PacienteEntity, MedicoEntity])],
  providers: [PacienteMedicoService, PacienteService, MedicoService],
  exports: [PacienteMedicoService],
})
export class PacienteMedicoModule {}
