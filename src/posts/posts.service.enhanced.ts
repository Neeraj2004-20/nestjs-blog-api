import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async create(title: string, content: string, authorId: string): Promise<Post> {
    const post = this.postsRepository.create({ title, content, authorId });
    return this.postsRepository.save(post);
  }

  async findAll(page = 1, limit = 10, search = '', sortBy = 'createdAt', order: 'ASC' | 'DESC' = 'DESC') {
    const skip = (page - 1) * limit;
    const where = { published: true };
    
    if (search) {
      where['title'] = ILike(`%${search}%`);
    }

    const [data, total] = await this.postsRepository.findAndCount({
      where,
      skip,
      take: limit,
      order: { [sortBy]: order },
      relations: ['author'],
    });

    return {
      data,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string): Promise<Post> {
    const post = await this.postsRepository.findOne({ where: { id }, relations: ['author'] });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async update(id: string, title: string, content: string, userId: string): Promise<Post> {
    const post = await this.findOne(id);
    if (post.authorId !== userId) {
      throw new ForbiddenException('You can only update your own posts');
    }
    post.title = title;
    post.content = content;
    return this.postsRepository.save(post);
  }

  async publish(id: string, userId: string): Promise<Post> {
    const post = await this.findOne(id);
    if (post.authorId !== userId) {
      throw new ForbiddenException('You can only publish your own posts');
    }
    post.published = true;
    return this.postsRepository.save(post);
  }

  async remove(id: string, userId: string): Promise<void> {
    const post = await this.findOne(id);
    if (post.authorId !== userId) {
      throw new ForbiddenException('You can only delete your own posts');
    }
    await this.postsRepository.remove(post);
  }

  async findUserPosts(userId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await this.postsRepository.findAndCount({
      where: { authorId: userId },
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      data,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async search(query: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await this.postsRepository.findAndCount({
      where: [
        { title: ILike(`%${query}%`), published: true },
        { content: ILike(`%${query}%`), published: true },
      ],
      skip,
      take: limit,
      relations: ['author'],
    });

    return {
      data,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }
}
