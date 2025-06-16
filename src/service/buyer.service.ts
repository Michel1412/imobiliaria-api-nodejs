import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Buyer } from '../domain/buyer.entity';

@Injectable()
export class BuyerService {
  constructor(
    @InjectRepository(Buyer)
    private readonly buyerRepository: Repository<Buyer>,
  ) {}

  async findAll(): Promise<Buyer[]> {
    return this.buyerRepository.find({ relations: ['homeCity', 'interresedCity', 'comments'] });
  }

  async findOne(id: string): Promise<Buyer> {
    const buyer = await this.buyerRepository.findOne({ where: { id }, relations: ['homeCity', 'interresedCity', 'comments'] });
    
    if (!buyer) {
        throw new NotFoundException(`[BuyerService] Nenhum comprador encontrado para id: ${id}`);
    }

    return buyer;
  }
}
