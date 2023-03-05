import { Account } from '@/hanulse/domain/account.entity';
import { IAccountFilter } from '@/hanulse/application/dto/account/account-filter';
import { IAccountFields } from '@/hanulse/application/dto/account/account-fields';
import { Nullable } from '@/global/common/types/native';

// const TAG = "IAccountRepository"

export interface IAccountRepository {
  get(accountFilter: IAccountFilter): Promise<Nullable<Account>>;
  exists(accountFilter: IAccountFilter): Promise<boolean>;
  create(accountFields: IAccountFields): Promise<Account>;
}

export const IAccountRepository = Symbol('IAccountRepository');
