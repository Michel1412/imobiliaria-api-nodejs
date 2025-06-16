import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Association } from '../domain/association.entity';

@Injectable()
export class AssociationService {
  constructor(
    @InjectRepository(Association)
    private readonly associationRepository: Repository<Association>,
  ) {}

  async findAll(): Promise<Association[]> {
    return this.associationRepository.find({ relations: ['sellers', 'comments'] });
  }

  async findOne(id: string): Promise<Association> {
    const association = await this.associationRepository.findOne({ where: { id }, relations: ['sellers', 'comments'] });

    if (!association) {
        throw new NotFoundException(`[AssociationService] Nenhuma associacao encontrada para id: ${id}`);
    }

    return association;
}
}
