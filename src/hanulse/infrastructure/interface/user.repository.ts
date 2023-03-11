import { HanulseUser } from '@/hanulse/domain/user.entity';
import { IHanulseUserFilter } from '@/hanulse/application/dto/user/user-filter';
import { IHanulseUserFields } from '@/hanulse/application/dto/user/user-fields';
import { Nullable } from '@/common/types/native';

// const TAG = "IHanulseUserRepository"

export interface IHanulseUserRepository {
  get(filter: IHanulseUserFilter): Promise<Nullable<HanulseUser>>;
  exists(filter: IHanulseUserFilter): Promise<boolean>;
  create(fields: IHanulseUserFields): Promise<HanulseUser>;
}

export const IHanulseUserRepository = Symbol('IHanulseUserRepository');
