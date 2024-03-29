import { Index, ModelOptions, Prop } from '@typegoose/typegoose';
import { ObjectId } from '@/common/types/mongo';
import { Nullable } from '@/common/types/native';
import { HanulsePrismaRepository } from '../infrastructure/prisma/prisma.service';
import { IHanulseUserFilter } from '../application/dto/user/user-filter';
import AuoiStringUtils from '@/auoi/common/utils/string.utils';
import { IHanulseUserFields } from '../application/dto/user/user-fields';

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

  comparePassword(password: string): boolean {
    return AuoiStringUtils.compareByBcrypt(password, this.hashedPassword);
  }

  /** 사용자 생성 */
  static async create(prismaService: HanulsePrismaRepository, fields: IHanulseUserFields): Promise<HanulseUser> {
    const raw = await prismaService.user.create({
      data: {
        name: fields.name,
        cellPhoneNumber: fields.cellPhoneNumber,
        hashedPassword: AuoiStringUtils.hashByBcrypt(fields.password),
      },
    });
    return HanulseUser.fromRaw(raw);
  }

  /** 사용자 탐색 */
  static async find(prismaService: HanulsePrismaRepository, filter: IHanulseUserFilter): Promise<Nullable<HanulseUser>> {
    const raw = await prismaService.user.findUnique({ where: filter });
    return raw ? HanulseUser.fromRaw(raw) : null;
  }

  /** 사용자 존재 여부 */
  static async exists(prismaService: HanulsePrismaRepository, filter: IHanulseUserFilter): Promise<boolean> {
    const raw = await prismaService.user.findUnique({ where: filter });
    return !!raw;
  }

  /** 사용자 객체 생성 */
  static fromRaw(raw: Partial<HanulseUser>) {
    const user = new HanulseUser();
    Object.assign(user, raw);
    return user;
  }
}
