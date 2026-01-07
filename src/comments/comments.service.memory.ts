import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  private comments = [];

  async create(postId: string, createCommentDto: CreateCommentDto, userId: string) {
    const comment = {
      id: Math.random().toString(),
      ...createCommentDto,
      postId,
      authorId: userId,
      likes: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.comments.push(comment);
    return comment;
  }

  async findByPost(postId: string) {
    return this.comments.filter(c => c.postId === postId).sort((a, b) => b.createdAt - a.createdAt);
  }

  async findOne(id: string) {
    const comment = this.comments.find(c => c.id === id);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return comment;
  }

  async update(id: string, content: string, userId: string) {
    const comment = await this.findOne(id);
    if (comment.authorId !== userId) {
      throw new ForbiddenException('You can only edit your own comments');
    }
    comment.content = content;
    comment.updatedAt = new Date();
    return comment;
  }

  async remove(id: string, userId: string): Promise<void> {
    const comment = await this.findOne(id);
    if (comment.authorId !== userId) {
      throw new ForbiddenException('You can only delete your own comments');
    }
    this.comments = this.comments.filter(c => c.id !== id);
  }

  async likeComment(id: string) {
    const comment = await this.findOne(id);
    comment.likes += 1;
    return comment;
  }
}
