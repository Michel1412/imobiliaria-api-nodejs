import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from '../../domain/property.entity';
import { BuyerService } from '../../service/buyer.service';
import { RentPropertyDto } from 'src/domain/dto/property.dto';

@Injectable()
export class PropertyRentUseCase {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    private readonly buyerService: BuyerService,
  ) {}

  async execute(propertyId: string, dto: RentPropertyDto): Promise<Property> {
    const property = await this.propertyRepository.findOneBy({ id: propertyId });

    if (!property) throw new NotFoundException('[PropertyRentUseCase] Propriedade não encontrada.');

    await this.buyerService.findOne(dto.buyerId);

    const start = new Date(dto.startDate);
    const finish = new Date(dto.finishDate);

    if (isNaN(start.getTime()) || isNaN(finish.getTime()) || start > finish) {
      throw new BadRequestException('[PropertyRentUseCase] Erro nas datas passadas');
    }

    property.periodRentByBuyer = {
      buyerId: dto.buyerId,
      startDate: dto.startDate,
      finishDate: dto.finishDate,
    };

    return await this.propertyRepository.save(property);
  }
}