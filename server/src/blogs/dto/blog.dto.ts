import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';

export enum BlogStatus {
  PUBLISHED = 'PUBLISHED',
  DRAFT = 'DRAFT',
}

export class CreateBlogDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsEnum(BlogStatus)
  status: BlogStatus;
}
