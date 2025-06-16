import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from '../../domain/property.entity';
import { SellerService } from '../../service/seller.service';
import { CommentService } from '../../service/comment.service';
import { UpdatePropertyDto } from '../../domain/dto/property.dto';

@Injectable()
export class UpdatePropertyUseCase {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    private readonly sellerService: SellerService,
    private readonly commentService: CommentService,
  ) {}

  async execute(id: string, dto: UpdatePropertyDto): Promise<Property> {
    const property = await this.propertyRepository.findOneBy({ id });

    if (!property) {
      throw new NotFoundException(`[UpdateProperty] Nenhuma propriedade encontrada para id: ${id}`);
    }

    if (dto.sellerId) property.seller = await this.sellerService.findOne(dto.sellerId);
    if (dto.name) property.name = dto.name;
    if (dto.value !== undefined) property.value = dto.value;
    if (dto.isRentable !== undefined) property.isRentable = dto.isRentable;
    if (dto.isPurchasable !== undefined) property.isPurchasable = dto.isPurchasable;
    if (dto.description) property.description = dto.description;
    if (dto.images) property.images = dto.images;
    if (dto.adress) property.adress = dto.adress;
    if (dto.isOnHigh !== undefined) property.isOnHigh = dto.isOnHigh;

    return this.propertyRepository.save(property);
  }
}
