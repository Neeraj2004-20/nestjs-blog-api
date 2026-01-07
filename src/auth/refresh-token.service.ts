import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RefreshTokenService {
  constructor(private jwtService: JwtService) {}

  generateAccessToken(payload: any) {
    return this.jwtService.sign(payload, { expiresIn: '15m' });
  }

  generateRefreshToken(payload: any) {
    return this.jwtService.sign(payload, { expiresIn: '7d', secret: process.env.REFRESH_TOKEN_SECRET || 'refresh-secret' });
  }

  verifyRefreshToken(token: string) {
    try {
      return this.jwtService.verify(token, { secret: process.env.REFRESH_TOKEN_SECRET || 'refresh-secret' });
    } catch (err) {
      throw new Error('Invalid refresh token');
    }
  }
}
