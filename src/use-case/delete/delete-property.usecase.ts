import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from '../../domain/property.entity';

export interface DeletePropertyResponse {
  numDeleted: number;
  message: string;
}

@Injectable()
export class DeletePropertyUseCase {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) {}

  async execute(id: string): Promise<DeletePropertyResponse> {
    const result = await this.propertyRepository.delete(id);
    
    if (!result || !result.affected) {
      throw new NotFoundException(`[DeleteProperty] Erro ao deletar ou propriedade não encontrada para id: ${id}`);
    }

    return {
      message: `[DeleteProperty] Exclusão executada com sucesso para id: ${id}.`,
      numDeleted: result.affected,
    };
  }
}
