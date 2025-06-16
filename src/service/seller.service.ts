import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seller } from '../domain/seller.entity';

@Injectable()
export class SellerService {
  constructor(
    @InjectRepository(Seller)
    private readonly sellerRepository: Repository<Seller>,
  ) {}

  async findAll(): Promise<Seller[]> {
    return this.sellerRepository.find({ relations: ['homeCity', 'shopCity', 'association', 'comments'] });
  }

  async findOne(id: string): Promise<Seller> {
    const seller = await this.sellerRepository.findOne({ where: { id }, relations: ['homeCity', 'shopCity', 'association', 'comments'] });

    if (!seller) {
        throw new NotFoundException(`[SellerService] Nenhuma vendedor encontrado para id: ${id}`);
    }

    return seller;
}
}
