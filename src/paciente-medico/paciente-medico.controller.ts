import { Controller, Post, Get, Delete, Param } from '@nestjs/common';
import { PacienteMedicoService } from '../paciente-medico/paciente-medico.service';


@Controller('pacientes')
export class PacienteMedicoController {
  constructor(private readonly pacienteMedicoService: PacienteMedicoService) {}

  @Post(':pacienteId/medicos/:medicoId')
  async addMedicoToPaciente(
    @Param('pacienteId') pacienteId: string,
    @Param('medicoId') medicoId: string,
  ) {
    return await this.pacienteMedicoService.addMedicoToPaciente(
      pacienteId,
      medicoId,
    );
  }

  @Get(':pacienteId/medicos')
  async findMedicosByPacienteId(@Param('pacienteId') pacienteId: string) {
    return await this.pacienteMedicoService.findMedicosByPacienteId(pacienteId);
  }

  @Delete(':pacienteId/medicos/:medicoId')
  async deleteMedicoFromPaciente(
    @Param('pacienteId') pacienteId: string,
    @Param('medicoId') medicoId: string,
  ) {
    return await this.pacienteMedicoService.deleteMedicoFromPaciente(
      pacienteId,
      medicoId,
    );
  }
}
