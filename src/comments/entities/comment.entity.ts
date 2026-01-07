import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Post } from '../../posts/entities/post.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, user => user.comments, { eager: true })
  author: User;

  @Column()
  authorId: string;

  @ManyToOne(() => Post, post => post.comments, { onDelete: 'CASCADE' })
  post: Post;

  @Column()
  postId: string;

  @Column({ default: 0 })
  likes: number;
}
