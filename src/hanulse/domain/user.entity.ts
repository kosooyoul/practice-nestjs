import { Index, ModelOptions, Prop } from '@typegoose/typegoose';
import { ObjectId } from '@/common/types/mongo';
import { Nullable } from '@/common/types/native';
import { HanulsePrismaService } from '../infrastructure/prisma/prisma.service';
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

  static async create(prismaService: HanulsePrismaService, fields: IHanulseUserFields): Promise<HanulseUser> {
    const raw = await prismaService.user.create({
      data: {
        name: fields.name,
        cellPhoneNumber: fields.cellPhoneNumber,
        hashedPassword: AuoiStringUtils.hashByBcrypt(fields.password),
      },
    });
    return HanulseUser.from(raw);
  }

  static async find(prismaService: HanulsePrismaService, filter: IHanulseUserFilter): Promise<Nullable<HanulseUser>> {
    const raw = await prismaService.user.findUnique({ where: filter });
    return raw ? HanulseUser.from(raw) : null;
  }

  static async exists(prismaService: HanulsePrismaService, filter: IHanulseUserFilter): Promise<boolean> {
    const raw = await prismaService.user.findUnique({ where: filter });
    return !!raw;
  }

  static from(raw: Partial<HanulseUser>) {
    const user = new HanulseUser();
    Object.assign(user, raw);
    return user;
  }
}
