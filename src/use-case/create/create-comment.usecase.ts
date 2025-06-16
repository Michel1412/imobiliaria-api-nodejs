import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '../../domain/comment.entity';
import { CreateCommentDto } from '../../domain/dto/comment.dto';
import { Repository } from 'typeorm';

export class CreateCommentUseCase {
    
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async execute(dto: CreateCommentDto): Promise<Comment> {
    if (!this.isValidParams(dto)) {
      throw new Error('[CreateCommentUseCase] Parâmetros inválidos.');
    }

    const comment = new Comment();
    comment.stars = dto.stars;
    comment.comment = dto.comment;
    comment.profile = dto.profile;

    return await this.commentRepository.save(comment);
  }

  isValidParams(dto: CreateCommentDto): boolean {
    return !!(dto && dto.stars && dto.profile);
  }
}