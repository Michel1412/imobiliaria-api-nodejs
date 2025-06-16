import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '../../domain/comment.entity';
import { Repository } from 'typeorm';

export interface DeleteCommentResponse {
  numDeleted: number;
  message: string;
}

export class DeleteCommentUseCase {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>
) {}

  async execute(id: string): Promise<DeleteCommentResponse> {
    const result = await this.commentRepository.delete(id);

    if (!result || !result.affected) {
      throw new Error(`[DeleteComment] Erro ao deletar ou comentário não encontrado para id: ${id}.`);
    }

    return {
      message: `[DeleteComment] Exclusão executada com sucesso para id: ${id}.`,
      numDeleted: result.affected,
    };
  }
}