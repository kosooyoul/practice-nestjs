import { Time } from '@/common/constants/time';
import { TokenType } from '@/common/enums';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApolloError } from 'apollo-server-core';
import { IRefreshTokenRepository } from '@/hanulse/infrastructure/interface/refresh-token.repository';
import { IHanulseSignInResult } from '../dto/sign/sign-in-result';
import { Nullable } from '@/common/types/native';
import * as jwt from 'jsonwebtoken';
import { HanulseUser } from '@/hanulse/domain/user.entity';
import { ISignature } from '@/hanulse/common/signature.decorator';

const TAG = 'HanulseSignService';

@Injectable()
export class HanulseSignService {
  constructor(
    @Inject(IRefreshTokenRepository)
    private readonly refreshTokenRepository: IRefreshTokenRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(user: HanulseUser): Promise<IHanulseSignInResult> {
    const signature: any = {
      id: user.id,
      name: user.name,
      identity: user.cellPhoneNumber,
    };

    const accessToken = this.generateToken(signature, TokenType.ACCESS);
    const refreshToken = this.generateToken(signature, TokenType.REFRESH);
    const accessTokenExpiresIn = new Date(Date.now() + Time.MILLS_1_DAY);
    const refreshTokenExpiresIn = new Date(Date.now() + Time.MILLS_30_DAYS);

    await this.refreshTokenRepository.createRefreshToken({
      signatureId: user._id,
      refreshToken: refreshToken,
      deleteAt: new Date(Date.now() + Time.MILLS_90_DAYS),
    });

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
      accessTokenExpiresIn: accessTokenExpiresIn,
      refreshTokenExpiresIn: refreshTokenExpiresIn,
    };
  }

  async signInBySignature(signature: ISignature): Promise<IHanulseSignInResult> {
    const accessToken = this.generateToken(signature, TokenType.ACCESS);
    const refreshToken = this.generateToken(signature, TokenType.REFRESH);
    const accessTokenExpiresIn = new Date(Date.now() + Time.MILLS_1_DAY);
    const refreshTokenExpiresIn = new Date(Date.now() + Time.MILLS_30_DAYS);

    await this.refreshTokenRepository.createRefreshToken({
      signatureId: signature.id,
      refreshToken: refreshToken,
      deleteAt: new Date(Date.now() + Time.MILLS_90_DAYS),
    });

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
      accessTokenExpiresIn: accessTokenExpiresIn,
      refreshTokenExpiresIn: refreshTokenExpiresIn,
    };
  }

  async signOut(signature: ISignature): Promise<true> {
    await this.refreshTokenRepository.deleteRefreshToken({
      signatureId: signature.id,
    });

    return true;
  }

  async refreshSign(accessToken: string, refreshToken: string): Promise<IHanulseSignInResult> {
    const signature = this.decodeToken(accessToken);
    if (signature == null) throw new ApolloError('AUTH_TOKEN_IS_NOT_VALID', TAG);

    const deletedRefreshToken = await this.refreshTokenRepository.deleteRefreshToken({
      signatureId: signature.id,
      refreshToken: refreshToken,
    });
    if (!deletedRefreshToken) throw new ApolloError('REFRESH_TOKEN_DOES_NOT_EXIST', TAG);

    return await this.signInBySignature(signature);
  }

  private generateToken(fields: any, tokenType: TokenType) {
    const token = this.jwtService.sign(
      {
        ...fields,
        tokenType: tokenType,
        generatedAt: new Date(),
      },
      {
        expiresIn: tokenType === TokenType.ACCESS ? Time.MILLS_1_DAY : Time.MILLS_30_DAYS,
        secret: tokenType === TokenType.ACCESS ? process.env.ACCESS_TOKEN_JWT_SECRET : process.env.REFRESH_TOKEN_JWT_SECRET,
      },
    );
    return token;
  }

  private decodeToken(token: string): Nullable<ISignature> {
    try {
      const data = jwt.decode(token);

      if (!data) return null;
      if (typeof data != 'object') return null;

      return {
        id: data['id'],
      };
    } catch (e: any) {
      // Do nothing
    }
    return null;
  }
}
