import { Index, ModelOptions, Prop } from '@typegoose/typegoose';
import { ObjectId } from '@/common/types/mongo';

/** @Deprecated */
@ModelOptions({
  schemaOptions: { collection: 'refresh_tokens', versionKey: false },
})
@Index({ signatureId: 1 })
@Index({ deleteAt: 1 }, { expireAfterSeconds: 0 })
export class RefreshToken {
  _id!: ObjectId;

  @Prop({ ref: 'Object', required: true })
  signatureId!: ObjectId;

  @Prop({ type: String, required: true })
  refreshToken!: string;

  @Prop({ required: false })
  deleteAt?: Date;

  @Prop({ default: Date.now })
  createdAt!: Date;
}
