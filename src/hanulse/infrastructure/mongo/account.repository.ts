import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Account } from '@/hanulse/domain/account.entity';
import { ReturnModelType } from '@typegoose/typegoose';
import { IAccountFilter } from '@/hanulse/application/dto/account/account-filter';
import { IAccountFields } from '@/hanulse/application/dto/account/account-fields';
import { IAccountRepository } from '@/hanulse/infrastructure/interface/account.repository';
import { Nullable } from '@/global/common/types/native';

// const TAG = 'AccountMongoRepository';

@Injectable()
export class AccountMongoRepository implements IAccountRepository {
  constructor(
    @InjectModel(Account)
    private readonly accountModel: ReturnModelType<typeof Account>,
  ) {}

  async get(accountFilter: IAccountFilter): Promise<Nullable<Account>> {
    return await this.accountModel.findOne(accountFilter);
  }

  async exists(accountFilter: IAccountFilter): Promise<boolean> {
    const count = await this.accountModel.count(accountFilter);
    return count != 0;
  }

  async create(accountFields: IAccountFields): Promise<Account> {
    return await this.accountModel.create({
      email: accountFields.email,
      password: accountFields.password,
      username: accountFields.username,
    });
  }
}
