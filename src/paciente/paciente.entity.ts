import {
    Column,
    Entity,
    OneToMany,
    ManyToMany,
    JoinTable,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { DiagnosticoEntity } from '../diagnostico/diagnostico.entity';
  import { MedicoEntity } from '../medico/medico.entity';
  
  @Entity()
  export class PacienteEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    nombre: string;
  
    @Column()
    genero: string;
  
    @ManyToMany(() => MedicoEntity, (medico) => medico.pacientes)
  
    @JoinTable()
    medicos: MedicoEntity[];
  
    @OneToMany(() => DiagnosticoEntity, (diagnostico) => diagnostico.paciente)
    diagnosticos: DiagnosticoEntity[];
  }
  