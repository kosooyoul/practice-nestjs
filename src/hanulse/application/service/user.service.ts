import { Inject, Injectable } from '@nestjs/common';
import { HanulseUser } from '@/hanulse/domain/user.entity';
import { IHanulseUserRepository } from '@/hanulse/infrastructure/interface/user.repository';
import { IHanulseUserFilter } from '../dto/user/user-filter';
import { IHanulseUserFields } from '../dto/user/user-fields';
import * as bcrypt from 'bcrypt';
import { Nullable, Optional } from '@/common/types/native';
import { HanulsePrismaService } from '@/hanulse/infrastructure/prisma/prisma.service';

// const TAG = "HanulseUserService"

@Injectable()
export class HanulseUserService {
  constructor(
    // Deprecated: Use Prisma instead of Mongoose
    // @Inject(IHanulseUserRepository)
    // private readonly userRepository: IHanulseUserRepository,
    private readonly prismaService: HanulsePrismaService,
  ) {}

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

    if (this.comparePassword(password, user.hashedPassword) == false) {
      return null;
    }
    return user;
  }

  async createUser(fields: IHanulseUserFields): Promise<HanulseUser> {
    const userFields = await this.prismaService.user.create({ data: {
      name: fields.name,
      cellPhoneNumber: fields.cellPhoneNumber,
      hashedPassword: fields.hashedPassword,
    } });
    return HanulseUser.from(userFields);
  }

  // TODO: Seperate this function to util class
  private comparePassword(password: string, hashedPassword: string): boolean {
    // bcrypt.genSaltSync(SignUtils.SALT_ROUND, SignUtils.SALT_MINOR)
    return bcrypt.compareSync(password, hashedPassword);
  }
}
