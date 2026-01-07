import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@ApiTags('comments')
@Controller('posts/:postId/comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a comment on a post' })
  async create(
    @Param('postId') postId: string,
    @Body() createCommentDto: CreateCommentDto,
    @Request() req,
  ) {
    return this.commentsService.create(postId, createCommentDto, req.user.userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all comments on a post' })
  async findByPost(@Param('postId') postId: string) {
    return this.commentsService.findByPost(postId);
  }

  @Patch(':commentId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a comment' })
  async update(
    @Param('commentId') commentId: string,
    @Body() body: { content: string },
    @Request() req,
  ) {
    return this.commentsService.update(commentId, body.content, req.user.userId);
  }

  @Delete(':commentId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a comment' })
  async remove(@Param('commentId') commentId: string, @Request() req) {
    await this.commentsService.remove(commentId, req.user.userId);
    return { statusCode: 200, message: 'Comment deleted successfully' };
  }

  @Post(':commentId/like')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Like a comment' })
  async like(@Param('commentId') commentId: string) {
    return this.commentsService.likeComment(commentId);
  }
}
