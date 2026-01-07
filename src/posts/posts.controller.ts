import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  async create(
    @Body() createPostDto: CreatePostDto,
    @Request() req,
  ) {
    return this.postsService.create(createPostDto.title, createPostDto.content, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('user/my-posts')
  @ApiOperation({ summary: 'Get current user posts' })
  async getMyPosts(@Request() req) {
    return this.postsService.findUserPosts(req.user.userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all published posts' })
  async findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a post by id' })
  async findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Update a post' })
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Request() req,
  ) {
    return this.postsService.update(id, updatePostDto.title, updatePostDto.content, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id/publish')
  @ApiOperation({ summary: 'Publish a post' })
  async publish(@Param('id') id: string, @Request() req) {
    return this.postsService.publish(id, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a post' })
  async remove(@Param('id') id: string, @Request() req) {
    return this.postsService.remove(id, req.user.userId);
  }
}
