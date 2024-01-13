/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtEntity } from 'src/domain/entities/jwt.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    description: 'Método POST que retorna un JWT habilitado durante 10 minutos',
  })
  @ApiCreatedResponse({
    description:
      'JWT Token válido para utilizarse en peticiones de Cambio de Tipo de Monedas',
    type: JwtEntity,
  })
  @ApiInternalServerErrorResponse({
    description: 'Excepción manejada en caso de que no se pueda generar el JWT',
    schema: {
      items: {
        example: {
          timestamp: new Date().toISOString(),
          statusCode: 500,
          path: '/api/auth/login',
          message: 'Internal server error',
        },
      },
    },
  })
  @Post('login')
  async login() {
    return await this.authService.generateToken();
  }
}
