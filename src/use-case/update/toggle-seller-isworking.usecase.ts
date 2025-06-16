import { Injectable, NotFoundException } from '@nestjs/common';
import { SellerService } from '../../service/seller.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seller } from '../../domain/seller.entity';

@Injectable()
export class ToggleSellerIsWorkingUseCase {
  constructor(
    private readonly sellerService: SellerService,
    @InjectRepository(Seller)
    private readonly sellerRepository: Repository<Seller>,
  ) {}

  async execute(id: string): Promise<Seller> {
    const seller = await this.sellerService.findOne(id);
    
    seller.isWorking = !seller.isWorking;

    return this.sellerRepository.save(seller);
  }
}
