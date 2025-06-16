import { InjectRepository } from '@nestjs/typeorm';
import { City } from '../../domain/city.entity';
import { Repository } from 'typeorm';

export interface DeleteCityResponse {
  numDeleted: number;
  message: string;
}

export class DeleteCityUseCase {
  constructor(
      @InjectRepository(City)
      private readonly cityRepository: Repository<City>
    ) {}

  async execute(id: string): Promise<DeleteCityResponse> {
    const result = await this.cityRepository.delete(id);

    if (!result || !result.affected) {
      throw new Error(`[DeleteCity] Erro ao deletar ou cidade não encontrada para id: ${id}`);
    }

    return {
      message: `[DeleteCity] Exclusão executada com sucesso para id: ${id}`,
      numDeleted: result.affected,
    };
  }
}