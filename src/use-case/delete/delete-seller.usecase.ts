import { InjectRepository } from '@nestjs/typeorm';
import { Seller } from '../../domain/seller.entity';
import { Repository } from 'typeorm';

export interface DeleteSellerResponse {
    numDeleted: number;
    message: string;
}

export class DeleteSellerUseCase {
  constructor(
    @InjectRepository(Seller)
    private readonly sellerRepository: Repository<Seller>
) {}

  async execute(id: string): Promise<DeleteSellerResponse> {
    const result = await this.sellerRepository.delete(id);

    if (!result) {
        throw new Error('[DeleteSeller] Erro ao deletar ');
    }

    return {
        message: `[DeleteSeller] Delacao executada com sucesso para id: ${id}`,
        numDeleted: result.affected || 0
    };
  }
}
