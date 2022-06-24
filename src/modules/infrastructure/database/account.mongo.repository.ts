import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import Account from '@/modules/domain/account/account.entity';
import { ReturnModelType } from '@typegoose/typegoose';
import { Nullable } from '@/common/types';
import { AccountFilter } from '@/modules/application/account/account-filter.class';
import { AccountFields } from '@/modules/application/account/account-fields.class';
import { IAccountRepository } from '@/modules/domain/account/account.repository';

// const TAG = 'AccountMongoRepository';

@Injectable()
export class AccountMongoRepository implements IAccountRepository {
  constructor(
    @InjectModel(Account)
    private readonly accountModel: ReturnModelType<typeof Account>,
  ) {}

  async get(accountFilter: AccountFilter): Promise<Nullable<Account>> {
    return await this.accountModel.findOne(accountFilter);
  }

  async exists(accountFilter: AccountFilter): Promise<boolean> {
    const count = await this.accountModel.count(accountFilter);
    return count != 0;
  }

  async create(accountFields: AccountFields): Promise<Account> {
    return await this.accountModel.create({
      email: accountFields.email,
      password: accountFields.password,
      username: accountFields.username,
    });
  }
}
