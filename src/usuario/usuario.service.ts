import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './entity/usuario.entity';
import { Repository, Not } from 'typeorm';
import { UsuarioDto } from './dto/usuario-dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async obtenerUsuarios() {
    return await this.usuarioRepository.find({ where: { estado: Not(false) } });
  }

  async crearUsuario(usuarioDto: UsuarioDto) {
    const usuarioEntity = Object.assign(new UsuarioEntity(), usuarioDto);
    return await this.usuarioRepository.save(usuarioEntity);
  }

  async actualizarUsuario(idUsuario: number, usuarioDto: UsuarioDto) {
    const usuarioEntity = await this.usuarioRepository.findOne({
      where: { id: idUsuario },
    });
    usuarioEntity.nombre = usuarioDto.nombre;
    usuarioEntity.correo = usuarioDto.correo;
    usuarioEntity.contrasenia = usuarioDto.contrasenia;
    return await this.usuarioRepository.save(usuarioEntity);
  }

  async eliminarUsuario(idUsuario: number) {
    return await this.usuarioRepository.update(
      { id: idUsuario },
      { estado: false },
    );
  }
}
