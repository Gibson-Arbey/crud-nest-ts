import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UsuarioEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45 })
  nombre: string;

  @Column({ length: 45 })
  correo: string;

  @Column({ length: 45 })
  contrasenia: string;

  @Column({ default: true })
  estado: boolean;
}
