import { Buyer } from '../../domain/buyer.entity';
import { Repository } from 'typeorm';
import { CityService } from '../../service/city.service';
import { CommentService } from '../../service/comment.service';
import { UpdateBuyerDto } from 'src/domain/dto/buyer.dto';
import { InjectRepository } from '@nestjs/typeorm';

export class UpdateBuyerUseCase {
  constructor(
    @InjectRepository(Buyer)
    private readonly buyerRepository: Repository<Buyer>,
    private readonly cityService: CityService,
    private readonly commentService: CommentService,
  ) {}

  async execute(id: string, update: UpdateBuyerDto): Promise<Buyer> {
    const buyer = await this.buyerRepository.findOneBy({ id });
    if (!buyer) {
      throw new Error(`[UpdateBuyer] Nenhum comprador encontrado para id: ${id}`);
    }

    if (update.homeCityId) {
      buyer.homeCity = await this.cityService.findOne(update.homeCityId);
    }

    if (update.interresedCityId) {
      buyer.interresedCity = await this.cityService.findOne(update.interresedCityId);
    }

    if (update.name) buyer.name = update.name;
    if (update.rangeToSpend) buyer.rangeToSpend = update.rangeToSpend;

    return this.buyerRepository.save(buyer);
  }
}