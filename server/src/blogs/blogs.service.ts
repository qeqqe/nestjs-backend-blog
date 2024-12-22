import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateBlogDTO } from './dto/blog.dto';

const prisma = new PrismaClient();

@Injectable()
export class BlogsService {
  async findAll() {
    return prisma.blog.findMany({
      include: {
        User: {
          select: {
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findRecent() {
    return prisma.blog.findMany({
      take: 5,
      include: {
        User: {
          select: {
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async create(createBlogDto: CreateBlogDTO, userId: string) {
    const blog = await prisma.blog.create({
      data: {
        title: createBlogDto.title,
        description: createBlogDto.description || '',
        content: createBlogDto.content,
        status: createBlogDto.status,
        userId: userId,
      },
      include: {
        User: {
          select: {
            username: true,
          },
        },
      },
    });

    return blog;
  }

  async getUserBlogs(userId: string) {
    return prisma.blog.findMany({
      where: {
        userId,
      },
      include: {
        User: {
          select: {
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getStats(userId: string) {
    const [total, published, draft] = await Promise.all([
      prisma.blog.count({ where: { userId } }),
      prisma.blog.count({ where: { userId, status: 'PUBLISHED' } }),
      prisma.blog.count({ where: { userId, status: 'DRAFT' } }),
    ]);

    return {
      total,
      published,
      draft,
    };
  }
}
