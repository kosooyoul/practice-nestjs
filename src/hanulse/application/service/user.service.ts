import { Inject, Injectable } from '@nestjs/common';
import { HanulseUser } from '@/hanulse/domain/user.entity';
import { IHanulseUserRepository } from '@/hanulse/infrastructure/interface/user.repository';
import { IHanulseUserFilter } from '../dto/user/user-filter';
import { IHanulseUserFields } from '../dto/user/user-fields';
import * as bcrypt from 'bcrypt';
import { Nullable, Optional } from '@/common/types/native';

// const TAG = "HanulseUserService"

@Injectable()
export class HanulseUserService {
  constructor(
    @Inject(IHanulseUserRepository)
    private readonly userRepository: IHanulseUserRepository,
  ) {}

  async getUserById(userId: string): Promise<Nullable<HanulseUser>> {
    return await this.userRepository.get({ id: userId });
  }

  async getUserByCellPhoneNumber(cellPhoneNumber: string): Promise<Nullable<HanulseUser>> {
    return await this.userRepository.get({ cellPhoneNumber: cellPhoneNumber });
  }

  async getUserByFilter(filter: IHanulseUserFilter): Promise<Nullable<HanulseUser>> {
    return await this.userRepository.get(filter);
  }

  async isExistingUserCellPhoneNumber(cellPhoneNumber: string): Promise<boolean> {
    return await this.userRepository.exists({ cellPhoneNumber: cellPhoneNumber });
  }

  async getUserByIdWithPassword(userId: string, password: string): Promise<Optional<HanulseUser>> {
    return await this.getUserByFilterWithPassword({ id: userId }, password);
  }

  async getUserByFilterWithPassword(filter: IHanulseUserFilter, password: string): Promise<Optional<HanulseUser>> {
    const user = await this.userRepository.get(filter);
    if (user == null) return null;

    if (this.comparePassword(password, user.hashedPassword) == false) {
      return null;
    }
    return user;
  }

  async createUser(fields: IHanulseUserFields): Promise<HanulseUser> {
    return await this.userRepository.create(fields);
  }

  private comparePassword(password: string, hashedPassword: string): boolean {
    // bcrypt.genSaltSync(SignUtils.SALT_ROUND, SignUtils.SALT_MINOR)
    return bcrypt.compareSync(password, hashedPassword);
  }
}
