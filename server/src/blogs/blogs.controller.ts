import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { JwtAuthGuard } from '../auth/strategy/jwt-auth.guard';
import { CreateBlogDTO } from './dto/blog.dto';

@Controller('blogs')
@UseGuards(JwtAuthGuard)
export class BlogsController {
  constructor(private blogsService: BlogsService) {}

  @Get()
  findAll() {
    return this.blogsService.findAll();
  }

  @Get('recent')
  findRecent() {
    return this.blogsService.findRecent();
  }

  @Get('my-stats')
  getStats(@Request() req) {
    return this.blogsService.getStats(req.user.id);
  }

  @Get('my-blogs')
  getUserBlogs(@Request() req) {
    return this.blogsService.getUserBlogs(req.user.id);
  }

  @Post()
  async create(@Request() req, @Body() createBlogDto: CreateBlogDTO) {
    return await this.blogsService.create(createBlogDto, req.user.id);
  }
}
