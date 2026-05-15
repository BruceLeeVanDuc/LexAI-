import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User không tồn tại');
    return user;
  }

  async create(data: { email: string; passwordHash: string; fullName?: string }) {
    const existing = await this.findByEmail(data.email);
    if (existing) throw new ConflictException('Email đã được sử dụng');
    return this.prisma.user.create({ data });
  }

  async touchLastLogin(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: { lastLoginAt: new Date() },
    });
  }
}
