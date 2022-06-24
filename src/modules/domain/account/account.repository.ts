import Account from '@/modules/domain/account/account.entity';
import { Nullable } from '@/common/types';
import { AccountFilter } from '@/modules/application/account/account-filter.class';
import { AccountFields } from '@/modules/application/account/account-fields.class';

// const TAG = "IAccountRepository"

export interface IAccountRepository {
  get(accountFilter: AccountFilter): Promise<Nullable<Account>>;
  exists(accountFilter: AccountFilter): Promise<boolean>;
  create(accountFields: AccountFields): Promise<Account>;
}

export const IAccountRepository = Symbol('IAccountRepository');
