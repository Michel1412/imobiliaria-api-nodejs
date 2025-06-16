import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from '../../domain/property.entity';
import { BuyerService } from '../../service/buyer.service';

@Injectable()
export class PropertySelledUseCase {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    private readonly buyerService: BuyerService,
  ) {}

  async execute(propertyId: string, buyerId: string): Promise<{ message: string }> {
    const property = await this.propertyRepository.findOneBy({ id: propertyId });
    if (!property) throw new NotFoundException('[PropertySelledUseCase] Propriedade não encontrada.');

    await this.buyerService.findOne(buyerId); // lança erro se não existir

    await this.propertyRepository.delete(propertyId);

    return { message: '[PropertySelledUseCase] Propriedade vendida. Remocao do Objeto da base de dados concluida' };
  }
}