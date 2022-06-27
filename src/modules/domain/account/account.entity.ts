import { Index, ModelOptions, Prop, Severity } from '@typegoose/typegoose';
import { ObjectId } from '@/common/types';

@ModelOptions({ schemaOptions: { collection: 'accounts', versionKey: false } })
@Index({ email: 1 }, { unique: true })
export default class Account {
  _id!: ObjectId;

  @Prop({ type: String, required: true })
  email!: string;

  @Prop({ type: String, required: true })
  password!: string;

  @Prop({ type: String, required: true })
  username!: string;

  @Prop({ default: Date.now })
  updatedAt!: Date;

  @Prop({ default: Date.now })
  createdAt!: Date;
}
