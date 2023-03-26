import { Index, ModelOptions, Prop } from '@typegoose/typegoose';
import { ObjectId } from '@/common/types/mongo';
import { HanulseUser } from './user.entity';
import { HanulseGroup } from './group.entity';
import { HanulsePrismaRepository } from '../infrastructure/prisma/prisma.service';
import { Nullable } from '@/common/types/native';
import { IHanulseStudentFilter } from '../application/dto/student/student-filter';

@ModelOptions({ schemaOptions: { collection: 'students', versionKey: false } })
@Index({ groupId: 1 })
@Index({ classId: 1 })
export class HanulseStudent {
  @Prop({ type: ObjectId, required: true, alias: 'id', get: (oid: ObjectId) => oid.toHexString() })
  _id!: string;
  id!: string;

  @Prop({ type: ObjectId, required: false, get: (oid: ObjectId) => oid.toHexString() })
  userId?: string;

  @Prop({ ref: 'HanulseUser', foreignField: '_id', localField: 'userId', justOne: false })
  user!: HanulseUser;

  @Prop({ type: ObjectId, required: true, get: (oid: ObjectId) => oid.toHexString() })
  groupId!: string;

  @Prop({ ref: 'HanulseGroup', foreignField: '_id', localField: 'groupId', justOne: true })
  group!: HanulseGroup;

  @Prop({ type: ObjectId, required: true, get: (oid: ObjectId) => oid.toHexString() })
  groupUserId!: string;

  @Prop({ ref: 'HanulseUserGroup', foreignField: '_id', localField: 'groupUserId', justOne: true })
  groupUser!: HanulseGroup;

  @Prop({ default: Date.now })
  updatedAt!: Date;

  @Prop({ default: Date.now })
  createdAt!: Date;

  /** 학생 탐색 */
  static async find(prismaService: HanulsePrismaRepository, filter: IHanulseStudentFilter): Promise<Nullable<HanulseStudent>> {
    const raw = await prismaService.student.findUnique({ where: filter });
    return raw ? HanulseStudent.fromRaw(raw) : null;
  }

  /** 학생 존재 여부 */
  static async exists(prismaService: HanulsePrismaRepository, filter: IHanulseStudentFilter): Promise<boolean> {
    const raw = await prismaService.student.findUnique({ where: filter });
    return !!raw;
  }

  /** 학생 객체 생성 */
  static fromRaw(raw: Partial<HanulseStudent>): HanulseStudent {
    const student = new HanulseStudent();
    Object.assign(student, raw);
    return student;
  }
}
