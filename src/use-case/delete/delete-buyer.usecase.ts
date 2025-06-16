import { InjectRepository } from '@nestjs/typeorm';
import { Buyer } from '../../domain/buyer.entity';
import { Repository } from 'typeorm';

export interface DeleteBuyerResponse {
  numDeleted: number;
  message: string;
}

export class DeleteBuyerUseCase {
  constructor(
    @InjectRepository(Buyer)
    private readonly buyerRepository: Repository<Buyer>
) {}

  async execute(id: string): Promise<DeleteBuyerResponse> {
    const result = await this.buyerRepository.delete(id);

    if (!result || !result.affected) {
      throw new Error(`[DeleteBuyer] Erro ao deletar ou comprador não encontrado para id: ${id}`);
    }

    return {
      message: `[DeleteBuyer] Exclusão executada com sucesso para id: ${id}`,
      numDeleted: result.affected,
    };
  }
}