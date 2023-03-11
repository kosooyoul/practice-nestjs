import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { IHanulseUserFilter } from '@/hanulse/application/dto/user/user-filter';
import { IHanulseUserFields } from '@/hanulse/application/dto/user/user-fields';
import { IHanulseUserRepository } from '@/hanulse/infrastructure/interface/user.repository';
import { Nullable } from '@/common/types/native';
import { HanulseUser } from '@/hanulse/domain/user.entity';

// const TAG = 'IHanulseUserMongoRepository';

@Injectable()
export class IHanulseUserMongoRepository implements IHanulseUserRepository {
  constructor(
    @InjectModel(HanulseUser)
    private readonly userModel: ReturnModelType<typeof HanulseUser>,
  ) {}

  async get(filter: IHanulseUserFilter): Promise<Nullable<HanulseUser>> {
    return await this.userModel.findOne(filter);
  }

  async exists(filter: IHanulseUserFilter): Promise<boolean> {
    const count = await this.userModel.count(filter);
    return count != 0;
  }

  async create(fields: IHanulseUserFields): Promise<HanulseUser> {
    return await this.userModel.create({
      name: fields.name,
      cellPhoneNumber: fields.cellPhoneNumber,
    });
  }
}
