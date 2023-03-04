import { Injectable } from '@nestjs/common';
import { ISignature } from './auth.interface';
import { JwtService } from '@nestjs/jwt';
import { ObjectId, Optional } from '@/global/common/types';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  decodeToken(token: string): Optional<ISignature> {
    try {
      const data = this.jwtService.decode(token.replace(/^Bearer\s+/, ''));

      if (!data) return null;
      if (typeof data != 'object') return null;

      return {
        id: ObjectId(data['id'] || data['_id']),
        identity: data['identity'],
        name: data['name'],
        keep: data['keep'],
        tokenType: data['tokenType'],
      };
    } catch (e: any) {
      // Do nothing
    }

    return null;
  }
}
