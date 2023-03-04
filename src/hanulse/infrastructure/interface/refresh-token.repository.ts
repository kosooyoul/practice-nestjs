import { RefreshToken } from '@/hanulse/domain/refresh-token.entity';

// const TAG = "IRefreshTokenRepository"

export interface IRefreshTokenRepository {
  createRefreshToken(refreshTokenFields: any): Promise<RefreshToken>;
  deleteRefreshToken(refreshTokenFilter: any): Promise<boolean>;
}

export const IRefreshTokenRepository = Symbol('IRefreshTokenRepository');
