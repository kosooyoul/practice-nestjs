import { Account } from '@/hanulse/domain/account.entity';
import { Nullable } from '@/global/common/types';
import { IAccountFilter } from '@/hanulse/application/dto/account/account-filter';
import { IAccountFields } from '@/hanulse/application/dto/account/account-fields';

// const TAG = "IAccountRepository"

export interface IAccountRepository {
  get(accountFilter: IAccountFilter): Promise<Nullable<Account>>;
  exists(accountFilter: IAccountFilter): Promise<boolean>;
  create(accountFields: IAccountFields): Promise<Account>;
}

export const IAccountRepository = Symbol('IAccountRepository');
