import { ModelOptions, Prop } from '@typegoose/typegoose';
import { ObjectId } from '@/common/types/mongo';
import { HanulseUser } from './user.entity';
import { HanulseGroup } from './group.entity';

@ModelOptions({ schemaOptions: { collection: 'group-users', versionKey: false } })
export class HanulseGroupUser {
  @Prop({ type: ObjectId, required: true, alias: 'id', get: (oid: ObjectId) => oid.toHexString() })
  _id!: string;
  id!: string;

  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String, required: true })
  cellPhoneNumber!: string;

  @Prop({ type: ObjectId, required: true, get: (oid: ObjectId) => oid.toHexString() })
  groupId!: string;

  @Prop({ ref: 'HanulseGroup', foreignField: '_id', localField: 'groupId', justOne: true })
  group!: HanulseGroup;

  @Prop({ type: ObjectId, required: false, get: (oid: ObjectId) => oid.toHexString() })
  userId?: string;

  @Prop({ ref: 'HanulseUser', foreignField: '_id', localField: 'userId', justOne: false })
  user!: HanulseUser;

  @Prop({ default: Date.now })
  updatedAt!: Date;

  @Prop({ default: Date.now })
  createdAt!: Date;
}
