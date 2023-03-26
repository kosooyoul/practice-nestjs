import { Injectable } from '@nestjs/common';
import { HanulseUser } from '@/hanulse/domain/user.entity';
import { IHanulseUserFilter } from '../dto/user/user-filter';
import { IHanulseUserFields } from '../dto/user/user-fields';
import { Nullable, Optional } from '@/common/types/native';
import { HanulsePrismaService } from '@/hanulse/infrastructure/prisma/prisma.service';
import AuoiStringUtils from '@/auoi/common/utils/string.utils';

// const TAG = "HanulseUserService"

@Injectable()
export class HanulseUserService {
  constructor(private readonly prismaService: HanulsePrismaService) {}

  async getUserById(userId: string): Promise<Nullable<HanulseUser>> {
    const userFields = await this.prismaService.user.findUnique({ where: { id: userId } });
    if (userFields == null) return null;
    return HanulseUser.from(userFields);
  }

  async getUserByCellPhoneNumber(cellPhoneNumber: string): Promise<Nullable<HanulseUser>> {
    const userFields = await this.prismaService.user.findUnique({ where: { cellPhoneNumber: cellPhoneNumber } });
    if (userFields == null) return null;
    return HanulseUser.from(userFields);
  }

  async getUserByFilter(filter: IHanulseUserFilter): Promise<Nullable<HanulseUser>> {
    const userFields = await this.prismaService.user.findUnique({ where: filter });
    if (userFields == null) return null;
    return HanulseUser.from(userFields);
  }

  async isExistingUserCellPhoneNumber(cellPhoneNumber: string): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({ where: { cellPhoneNumber: cellPhoneNumber } });
    return user != null;
  }

  async getUserByIdWithPassword(userId: string, password: string): Promise<Optional<HanulseUser>> {
    return await this.getUserByFilterWithPassword({ id: userId }, password);
  }

  async getUserByFilterWithPassword(filter: IHanulseUserFilter, password: string): Promise<Optional<HanulseUser>> {
    const user = await this.getUserByFilter(filter);
    if (user == null) return null;

    if (AuoiStringUtils.compareByBcrypt(password, user.hashedPassword) == false) {
      return null;
    }
    return user;
  }

  async createUser(fields: IHanulseUserFields): Promise<HanulseUser> {
    const userFields = await this.prismaService.user.create({
      data: {
        name: fields.name,
        cellPhoneNumber: fields.cellPhoneNumber,
        hashedPassword: AuoiStringUtils.hashByBcrypt(fields.password),
      },
    });
    return HanulseUser.from(userFields);
  }
}
