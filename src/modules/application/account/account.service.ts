import { Inject, Injectable } from '@nestjs/common';
import { ObjectId, Nullable, Optional } from '@/common/types';
import Account from '@/modules/domain/account/account.entity';
import { IAccountRepository } from '@/modules/domain/account/account.repository';
import { AccountFilter } from './account-filter.class';
import { AccountFields } from './account-fields.class';
import * as bcrypt from 'bcrypt';

// const TAG = "AccountService"

@Injectable()
export class AccountService {
  constructor(
    @Inject(IAccountRepository)
    private readonly accountRepository: IAccountRepository,
  ) {}

  async getAccountById(accountId: ObjectId): Promise<Nullable<Account>> {
    return await this.accountRepository.get({ _id: accountId });
  }

  async getAccountByEmail(email: string): Promise<Nullable<Account>> {
    return await this.accountRepository.get({ email: email });
  }

  async getAccountByFilter(
    accountFilter: AccountFilter,
  ): Promise<Nullable<Account>> {
    return await this.accountRepository.get(accountFilter);
  }

  async IsExistingAccountEmail(email: string): Promise<boolean> {
    return await this.accountRepository.exists({ email: email });
  }

  async getAccountByIdWithPassword(
    accountId: ObjectId,
    password: string,
  ): Promise<Optional<Account>> {
    return await this.getAccountByFilterWithPassword(
      { _id: accountId },
      password,
    );
  }

  async getAccountByFilterWithPassword(
    accountFilter: AccountFilter,
    password: string,
  ): Promise<Optional<Account>> {
    const account = await this.accountRepository.get(accountFilter);
    if (account == null) return null;

    if (this.comparePassword(password, account.password) == false) {
      return null;
    }
    return account;
  }

  async createAccount(accountFields: AccountFields): Promise<Account> {
    return await this.accountRepository.create(accountFields);
  }

  private comparePassword(password: string, hashedPassword: string): boolean {
    // bcrypt.genSaltSync(SignUtils.SALT_ROUND, SignUtils.SALT_MINOR)
    return bcrypt.compareSync(password, hashedPassword);
  }
}
