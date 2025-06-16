import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/domain/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async findAll(): Promise<Comment[]> {
    return this.commentRepository.find();
  }

  async findOne(id: string): Promise<Comment> {
    const comment = await this.commentRepository.findOneBy({ id });

    if (!comment) {
        throw new NotFoundException(`[CommentService] Nenhum comentário encontrado para id: ${id}`);
    }
    
    return comment;
  }
}
