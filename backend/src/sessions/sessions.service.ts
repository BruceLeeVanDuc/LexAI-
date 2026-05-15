import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SessionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(title?: string, userId?: string) {
    return this.prisma.session.create({
      data: {
        title: title ?? 'New chat',
        userId: userId ?? null,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.session.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
      include: { _count: { select: { messages: true } } },
    });
  }

  async findOne(id: string, userId: string) {
    const session = await this.prisma.session.findUnique({
      where: { id },
      include: { messages: { orderBy: { createdAt: 'asc' } } },
    });
    if (!session) throw new NotFoundException(`Session ${id} không tồn tại`);
    if (session.userId !== userId) {
      throw new ForbiddenException('Bạn không có quyền truy cập session này');
    }
    return session;
  }

  async assertOwner(id: string, userId: string) {
    const s = await this.prisma.session.findUnique({
      where: { id },
      select: { userId: true },
    });
    if (!s) throw new NotFoundException(`Session ${id} không tồn tại`);
    if (s.userId !== userId) {
      throw new ForbiddenException('Bạn không có quyền truy cập session này');
    }
  }

  async touch(id: string) {
    return this.prisma.session.update({
      where: { id },
      data: { updatedAt: new Date() },
    });
  }

  async remove(id: string, userId: string) {
    await this.assertOwner(id, userId);
    await this.prisma.session.delete({ where: { id } });
    return { deleted: true };
  }
}
