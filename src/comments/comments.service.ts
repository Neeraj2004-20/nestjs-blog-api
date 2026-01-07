import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  private comments: any[] = [];

  async create(postId: string, createCommentDto: CreateCommentDto, userId: string): Promise<any> {
    const comment = {
      id: String(Date.now()),
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

  async findByPost(postId: string): Promise<any[]> {
    return this.comments.filter(c => c.postId === postId);
  }

  async findOne(id: string): Promise<any> {
    const comment = this.comments.find(c => c.id === id);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return comment;
  }

  async update(id: string, content: string, userId: string): Promise<any> {
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

  async likeComment(id: string): Promise<any> {
    const comment = await this.findOne(id);
    comment.likes += 1;
    return comment;
  }
}
