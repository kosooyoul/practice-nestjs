import { ModelOptions, Prop } from '@typegoose/typegoose';
import { ObjectId } from '@/common/types/mongo';

@ModelOptions({ schemaOptions: { collection: 'groups', versionKey: false } })
export class HanulseGroup {
  @Prop({ type: ObjectId, required: true, alias: 'id', get: (oid: ObjectId) => oid.toHexString() })
  _id!: string;
  id!: string;

  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String, required: true })
  description!: string;

  @Prop({ default: Date.now })
  updatedAt!: Date;

  @Prop({ default: Date.now })
  createdAt!: Date;
}
