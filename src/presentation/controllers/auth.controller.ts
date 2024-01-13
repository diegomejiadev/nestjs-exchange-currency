/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    description: 'Método POST que retorna un JWT habilitado durante 10 minutos',
  })
  @Post('login')
  async login() {
    return await this.authService.generateToken();
  }
}
