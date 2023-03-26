import { Injectable } from '@nestjs/common';
import { HanulseUser } from '@/hanulse/domain/user.entity';
import { IHanulseUserFilter } from '../dto/user/user-filter';
import { IHanulseUserFields } from '../dto/user/user-fields';
import { Nullable, Optional } from '@/common/types/native';
import { HanulsePrismaRepository } from '@/hanulse/infrastructure/prisma/prisma.service';

// const TAG = "HanulseUserService"

@Injectable()
export class HanulseUserService {
  constructor(private readonly prismaRepository: HanulsePrismaRepository) {}

  async getUserById(userId: string): Promise<Nullable<HanulseUser>> {
    return HanulseUser.find(this.prismaRepository, { id: userId });
  }

  async getUserByCellPhoneNumber(cellPhoneNumber: string): Promise<Nullable<HanulseUser>> {
    return HanulseUser.find(this.prismaRepository, { cellPhoneNumber: cellPhoneNumber });
  }

  async getUserByFilter(filter: IHanulseUserFilter): Promise<Nullable<HanulseUser>> {
    return HanulseUser.find(this.prismaRepository, filter);
  }

  async isExistingUserCellPhoneNumber(cellPhoneNumber: string): Promise<boolean> {
    return HanulseUser.exists(this.prismaRepository, { cellPhoneNumber: cellPhoneNumber });
  }

  async getUserByIdWithPassword(userId: string, password: string): Promise<Optional<HanulseUser>> {
    return this.getUserByFilterWithPassword({ id: userId }, password);
  }

  async getUserByFilterWithPassword(filter: IHanulseUserFilter, password: string): Promise<Optional<HanulseUser>> {
    const user = await HanulseUser.find(this.prismaRepository, filter);
    if (user?.comparePassword(password)) {
      return user;
    }
    return null;
  }

  async createUser(fields: IHanulseUserFields): Promise<HanulseUser> {
    return HanulseUser.create(this.prismaRepository, fields);
  }
}
