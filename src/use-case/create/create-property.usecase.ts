import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from '../../domain/property.entity';
import { SellerService } from '../../service/seller.service';
import { CreatePropertyDto } from '../../domain/dto/property.dto';

@Injectable()
export class CreatePropertyUseCase {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    private readonly sellerService: SellerService,
  ) {}

  async execute(dto: CreatePropertyDto): Promise<Property> {
    if (!this.isValidParams(dto)) {
      throw new Error('[CreatePropertyUseCase] Parâmetros inválidos.');
    }

    const property = new Property();

    property.seller = await this.sellerService.findOne(dto.sellerId);
    property.name = dto.name;
    property.value = dto.value;
    property.isRentable = dto.isRentable;
    property.isPurchasable = dto.isPurchasable;
    property.description = dto.description;
    property.images = dto.images;
    property.adress = dto.adress;
    property.isOnHigh = dto.isOnHigh;

    return await this.propertyRepository.save(property);
  }

  isValidParams(dto: CreatePropertyDto): boolean {
    return !!(dto && dto.sellerId 
        && dto.name 
        && dto.value !== undefined 
        && dto.description 
        && dto.images 
        && dto.adress 
        && dto.isOnHigh !== undefined 
        && dto.isRentable !== undefined
         && dto.isPurchasable !== undefined);
  }
}
