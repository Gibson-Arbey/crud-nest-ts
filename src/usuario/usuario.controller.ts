import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';

import { UsuarioDto } from './dto/usuario-dto';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  async crearUsuario(@Body() usuarioDto: UsuarioDto, @Res() response) {
    try {
      await this.usuarioService.crearUsuario(usuarioDto);
      return response
        .status(HttpStatus.CREATED)
        .json({ msg: 'Usuario registrado exitosamente' });
    } catch (error) {
      return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  }

  @Get()
  async obtenerUsuarios(@Res() response) {
    try {
      const usuarios = await this.usuarioService.obtenerUsuarios();
      return response.status(HttpStatus.OK).json({ msg: usuarios });
    } catch (error) {
      return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  }

  @Put(':idUsuario')
  async actualizarUsuario(
    @Param('idUsuario') idUsuario: number,
    @Body() usuarioDto: UsuarioDto,
    @Res() response,
  ) {
    try {
      console.log(idUsuario);
      await this.usuarioService.actualizarUsuario(idUsuario, usuarioDto);
      return response
        .status(HttpStatus.OK)
        .json({ msg: 'Usuario actualizado exitosamente' });
    } catch (error) {
      return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  }

  @Delete(':idUsuario')
  async eliminarUsuario(
    @Param('idUsuario') idUsuario: number,
    @Res() response,
  ) {
    try {
      await this.usuarioService.eliminarUsuario(idUsuario);
      return response
        .status(HttpStatus.OK)
        .json({ msg: 'Usuario eliminado exitosamente' });
    } catch (error) {
      return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  }
}
