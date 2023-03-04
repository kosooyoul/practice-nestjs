import { RefreshToken } from '@/hanulse/domain/refresh-token.entity';
import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';

// const TAG = "RefreshTokenMongoRepository"

@Injectable()
export class RefreshTokenMongoRepository {
  constructor(
    @InjectModel(RefreshToken)
    private readonly refreshTokenModel: ReturnModelType<typeof RefreshToken>,
  ) {}

  async createRefreshToken(refreshTokenFields: any): Promise<RefreshToken> {
    return await this.refreshTokenModel.create({
      signatureId: refreshTokenFields.signatureId,
      refreshToken: refreshTokenFields.refreshToken,
      deleteAt: refreshTokenFields.deleteAt,
    });
  }

  async deleteRefreshToken(refreshTokenFilter: any): Promise<boolean> {
    const deleted = await this.refreshTokenModel.deleteOne(refreshTokenFilter);
    return deleted.deletedCount != 0;
  }
}
