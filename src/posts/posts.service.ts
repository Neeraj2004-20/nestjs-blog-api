import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';

@Injectable()
export class PostsService {
  private posts = [];

  async create(title: string, content: string, authorId: string) {
    const post = { id: Date.now(), title, content, authorId, published: false };
    this.posts.push(post);
    return post;
  }

  async findAll() {
    return this.posts.filter(p => p.published);
  }

  async findOne(id: string) {
    const post = this.posts.find(p => p.id === id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async update(id: string, title: string, content: string, userId: string) {
    const post = await this.findOne(id);
    if (post.authorId !== userId) {
      throw new ForbiddenException('You can only update your own posts');
    }
    post.title = title;
    post.content = content;
    return post;
  }

  async publish(id: string, userId: string) {
    const post = await this.findOne(id);
    if (post.authorId !== userId) {
      throw new ForbiddenException('You can only publish your own posts');
    }
    post.published = true;
    return post;
  }

  async remove(id: string, userId: string) {
    const post = await this.findOne(id);
    if (post.authorId !== userId) {
      throw new ForbiddenException('You can only delete your own posts');
    }
    this.posts = this.posts.filter(p => p.id !== id);
  }

  async findUserPosts(userId: string) {
    return this.posts.filter(p => p.authorId === userId);
  }
}
