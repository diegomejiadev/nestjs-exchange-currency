import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateToken() {
    const payload = { sub: 4597547875, username: 'Testing' };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
