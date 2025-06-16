import { UpdateCommentDto } from 'src/domain/dto/comment.dto';
import { Comment } from '../../domain/comment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export class UpdateCommentUseCase {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>
) {}

  async execute(id: string, update: UpdateCommentDto): Promise<Comment> {
    const comment = await this.commentRepository.findOneBy({ id });
    if (!comment) {
      throw new Error(`[UpdateComment] Nenhum comentário encontrado para id: ${id}`);
    }

    if (update.stars) comment.stars = update.stars;
    if (update.comment) comment.comment = update.comment;
    if (update.profile) comment.profile = update.profile;

    return this.commentRepository.save(comment);
  }
}