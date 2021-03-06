import {
  MILLS_1_DAY,
  MILLS_1_MINUTE,
  MILLS_7_DAYS,
  MILLS_1_YEAR,
  MILLS_90_DAYS,
} from '@/common/time';
import Account from '@/modules/domain/account/account.entity';
import { TokenType } from '@/common/enums';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApolloError } from 'apollo-server-core';
import { ISignature } from '@/accessory/auth/auth.interface';
import { IRefreshTokenRepository } from '@/modules/domain/refresh-token/refresh-token.repository';
import { SignInResult } from './sign-in-result.class';
import { Nullable, ObjectId } from '@/common/types';
import * as jwt from 'jsonwebtoken';

const TAG = 'AccountSignService';

@Injectable()
export class AccountSignService {
  constructor(
    @Inject(IRefreshTokenRepository)
    private readonly refreshTokenRepository: IRefreshTokenRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(account: Account, keep: boolean): Promise<SignInResult> {
    const signature: any = {
      id: account._id.toHexString(),
      identity: account.email,
      name: account.username,
    };

    const accessToken = this.generateToken(signature, TokenType.ACCESS, keep);
    const refreshToken = this.generateToken(signature, TokenType.REFRESH, keep);
    const expiresIn = new Date(
      Date.now() + this.getExpiresIn(TokenType.ACCESS, keep),
    );

    await this.refreshTokenRepository.createRefreshToken({
      signatureId: account._id,
      refreshToken: refreshToken,
      deleteAt: new Date(Date.now() + MILLS_90_DAYS),
    });

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
      expiresIn: expiresIn,
    };
  }

  async signInBySignature(signature: ISignature): Promise<SignInResult> {
    const accessToken = this.generateToken(
      signature,
      TokenType.ACCESS,
      signature.keep,
    );
    const refreshToken = this.generateToken(
      signature,
      TokenType.REFRESH,
      signature.keep,
    );
    const expiresIn = new Date(
      Date.now() + this.getExpiresIn(TokenType.ACCESS, signature.keep),
    );

    await this.refreshTokenRepository.createRefreshToken({
      signatureId: signature.id,
      refreshToken: refreshToken,
      deleteAt: new Date(Date.now() + MILLS_90_DAYS),
    });

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
      expiresIn: expiresIn,
    };
  }

  async signOut(signature: ISignature): Promise<true> {
    await this.refreshTokenRepository.deleteRefreshToken({
      signatureId: signature.id,
    });

    return true;
  }

  async refreshSign(
    accessToken: string,
    refreshToken: string,
  ): Promise<SignInResult> {
    const signature = this.decodeToken(accessToken);
    if (signature == null)
      throw new ApolloError('AUTH_TOKEN_IS_NOT_VALID', TAG);

    const deletedRefreshToken =
      await this.refreshTokenRepository.deleteRefreshToken({
        signatureId: signature.id,
        refreshToken: refreshToken,
      });
    if (!deletedRefreshToken)
      throw new ApolloError('REFRESH_TOKEN_DOES_NOT_EXIST', TAG);

    return await this.signInBySignature(signature);
  }

  private generateToken(fields: any, tokenType: TokenType, keep: boolean) {
    const token = this.jwtService.sign(
      {
        ...fields,
        keep: keep,
        tokenType: TokenType.ACCESS,
        generatedAt: new Date(),
      },
      {
        expiresIn: this.getExpiresIn(tokenType, keep),
        secret:
          tokenType === TokenType.ACCESS
            ? process.env.ACCESS_TOKEN_JWT_SECRET
            : process.env.REFRESH_TOKEN_JWT_SECRET,
      },
    );
    return token;
  }

  private getExpiresIn(tokenType: TokenType, keep: boolean) {
    if (tokenType == TokenType.ACCESS) {
      return process.env.TESTABLE
        ? keep
          ? MILLS_1_DAY
          : MILLS_1_MINUTE
        : keep
        ? MILLS_7_DAYS
        : MILLS_1_DAY;
    } else {
      return keep ? MILLS_1_YEAR : MILLS_1_YEAR;
    }
  }

  private decodeToken(token: string): Nullable<ISignature> {
    try {
      const data = jwt.decode(token);

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
