import { Seller } from '../../domain/seller.entity';
import { CreateSellerDto } from '../../domain/dto/seller.dto';
import { Repository } from 'typeorm';
import { CityService } from 'src/service/city.service';
import { AssociationService } from 'src/service/association.service';
import { InjectRepository } from '@nestjs/typeorm';

export class CreateSellerUseCase {

  constructor(
    @InjectRepository(Seller)
    private readonly sellerRepository: Repository<Seller>,
    private readonly cityService: CityService,
    private readonly associationService: AssociationService,
  ) {}

  async execute(dto: CreateSellerDto): Promise<Seller> {
    if (!this.isValidParams(dto)) {
        throw new Error('[CreateSellerUseCase] Parametros Invalidos.');
    }

    const seller = new Seller();

    seller.name = dto.name;
    seller.homeCity = await this.cityService.findOne(dto.homeCityId);
    seller.shopCity = await this.cityService.findOne(dto.shopCityId);
    seller.association = await this.associationService.findOne(dto.associationId);
    seller.isWorking = dto.isWorking;

    return await this.sellerRepository.save(seller);
  }

  isValidParams(dto: CreateSellerDto): boolean {
    return !!(dto && dto.name 
        && dto.associationId 
        && dto.homeCityId 
        && dto.shopCityId);
  }
}
