import { Index, ModelOptions, Prop } from '@typegoose/typegoose';
import { ObjectId } from '@/common/types/mongo';
import { HanulseGroup } from './group.entity';
import { HanulseGroupUser } from './group-user.entity';

@ModelOptions({ schemaOptions: { collection: 'classes', versionKey: false } })
@Index({ groupId: 1 })
@Index({ managerUserIds: 1 })
export class HanulseClass {
  @Prop({ type: ObjectId, required: true, alias: 'id', get: (oid: ObjectId) => oid.toHexString() })
  _id!: string;
  id!: string;

  @Prop({ type: String, required: true })
  title!: string;

  @Prop({ type: String, required: true })
  description!: string;

  @Prop({ type: ObjectId, required: true, get: (oid: ObjectId) => oid.toHexString() })
  groupId!: string;

  @Prop({ ref: 'HanulseGroup', foreignField: '_id', localField: 'groupId', justOne: true })
  group!: HanulseGroup;

  @Prop({ type: [ObjectId], required: false, get: (oids: ObjectId[]) => oids.map(oid => oid.toHexString()) })
  managerGroupUserIds!: string[];

  @Prop({ ref: 'HanulseGroupUser', foreignField: '_id', localField: 'userId', justOne: false })
  managerGroupUsers!: HanulseGroupUser[];

  @Prop({ default: Date.now })
  updatedAt!: Date;

  @Prop({ default: Date.now })
  createdAt!: Date;

  /** 수업 생성 */
  static fromRaw(raw: Partial<HanulseClass>): HanulseClass {
    const clazz = new HanulseClass();
    Object.assign(clazz, raw);
    return clazz;
  }
}
