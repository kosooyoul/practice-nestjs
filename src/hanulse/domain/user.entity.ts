import { Index, ModelOptions, Prop } from '@typegoose/typegoose';
import { ObjectId } from '@/common/types/mongo';

@ModelOptions({ schemaOptions: { collection: 'users', versionKey: false } })
@Index({ cellPhoneNumber: 1 }, { unique: true })
export class HanulseUser {
  @Prop({ type: ObjectId, required: true, alias: 'id', get: (oid: ObjectId) => oid.toHexString() })
  _id!: string;
  id!: string;

  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String, required: true })
  cellPhoneNumber!: string;

  @Prop({ type: String, required: false })
  hashedPassword?: string;

  @Prop({ default: Date.now })
  updatedAt!: Date;

  @Prop({ default: Date.now })
  createdAt!: Date;

  static from(fields: Partial<HanulseUser>) {
    const user = new HanulseUser();
    Object.assign(user, fields);
    return user;
  }
}
