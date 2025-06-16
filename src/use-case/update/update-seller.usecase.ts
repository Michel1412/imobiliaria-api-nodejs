import { Seller } from '../../domain/seller.entity';
import { UpdateSellerDto } from '../../domain/dto/seller.dto';
import { Repository } from 'typeorm';
import { CityService } from '../../service/city.service';
import { AssociationService } from '../../service/association.service';
import { CommentService } from '../../service/comment.service';
import { InjectRepository } from '@nestjs/typeorm';

export class UpdateSellerUseCase {
  constructor(
    @InjectRepository(Seller)
    private readonly sellerRepository: Repository<Seller>,
    private readonly cityService: CityService,
    private readonly associationService: AssociationService,
  ) {}

  async execute(id: string, dto: UpdateSellerDto): Promise<Seller> {
    const seller = await this.sellerRepository.findOneBy({ id });
    if (!seller) {
      throw new Error(`[UpdateSeller] Nenhum vendedor encontrado para id: ${id}.`);
    }

    seller.name = dto.name ?? seller.name;
    seller.isWorking = dto.isWorking ?? seller.isWorking;

    if (dto.homeCityId) {
      seller.homeCity = await this.cityService.findOne(dto.homeCityId);
    }

    if (dto.shopCityId) {
      seller.shopCity = await this.cityService.findOne(dto.shopCityId);
    }

    if (dto.associationId) {
      seller.association = await this.associationService.findOne(dto.associationId);
    }

    return this.sellerRepository.save(seller);
  }
}