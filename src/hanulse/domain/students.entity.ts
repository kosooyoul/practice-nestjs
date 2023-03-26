import { HanulsePrismaRepository } from '../infrastructure/prisma/prisma.service';
import { IHanulseStudentFilter } from '../application/dto/student/student-filter';
import { HanulseStudent } from './student.entity';

export class HanulseStudents {
  /** 학생 목록 */
  list!: HanulseStudent[];

  /** 총 학생 수 */
  countOfTotal!: number;

  /** 학생 목록 탐색 */
  static async find(prismaService: HanulsePrismaRepository, filter: IHanulseStudentFilter): Promise<HanulseStudents> {
    const raws = await prismaService.student.findMany({ where: filter });
    return HanulseStudents.fromRaws(raws);
  }

  /** 학생 객체 목록 생성 */
  static fromRaws(raws: Partial<HanulseStudent>[], countOfTotal?: number): HanulseStudents {
    const students = new HanulseStudents();
    students.list = raws.map(raw => HanulseStudent.fromRaw(raw));
    students.countOfTotal = countOfTotal ?? students.list.length;
    return students;
  }
}
