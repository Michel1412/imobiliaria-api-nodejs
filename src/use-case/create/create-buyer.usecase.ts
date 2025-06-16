import { Buyer } from '../../domain/buyer.entity';
import { CreateBuyerDto } from '../../domain/dto/buyer.dto';
import { Repository } from 'typeorm';
import { CityService } from '../../service/city.service';
import { CommentService } from '../../service/comment.service';
import { InjectRepository } from '@nestjs/typeorm';

export class CreateBuyerUseCase {
  constructor(
    @InjectRepository(Buyer)
    private readonly buyerRepository: Repository<Buyer>,
    private readonly cityService: CityService,
    private readonly commentService: CommentService,
  ) {}

  async execute(dto: CreateBuyerDto): Promise<Buyer> {
    if (!this.isValidParams(dto)) {
      throw new Error('[CreateBuyerUseCase] Parâmetros inválidos.');
    }

    const buyer = new Buyer();
    buyer.name = dto.name;
    buyer.homeCity = await this.cityService.findOne(dto.homeCityId);
    buyer.interresedCity = await this.cityService.findOne(dto.interresedCityId);
    buyer.rangeToSpend = dto.rangeToSpend;

    return await this.buyerRepository.save(buyer);
  }

  isValidParams(dto: CreateBuyerDto): boolean {
    return !!(dto && dto.name 
        && dto.homeCityId 
        && dto.interresedCityId 
        && dto.rangeToSpend);
  }
}