import { InjectRepository } from '@nestjs/typeorm';
import { Association } from '../../domain/association.entity';
import { Repository } from 'typeorm';

export interface DeleteAssociationResponse {
  numDeleted: number;
  message: string;
}

export class DeleteAssociationUseCase {
  constructor(
      @InjectRepository(Association)
      private readonly associationRepository: Repository<Association>
    ) {}

  async execute(id: string): Promise<DeleteAssociationResponse> {
    const result = await this.associationRepository.delete(id);

    if (!result || !result.affected) {
      throw new Error(`[DeleteAssociation] Erro ao deletar ou associação não encontrada para id: ${id}.`);
    }

    return {
      message: `[DeleteAssociation] Exclusão executada com sucesso para id: ${id}`,
      numDeleted: result.affected,
    };
  }
}