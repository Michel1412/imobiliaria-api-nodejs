import { InjectRepository } from '@nestjs/typeorm';
import { City } from '../../domain/city.entity';
import { CreateCityDto } from '../../domain/dto/city.dto';
import { Repository } from 'typeorm';

export class CreateCityUseCase {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
  ) {}

  async execute(dto: CreateCityDto): Promise<City> {
    if (!this.isValidParams(dto)) {
      throw new Error('[CreateCityUseCase] Parâmetros inválidos.');
    }

    const city = new City();
    city.name = dto.name;
    city.region = dto.region;
    city.state = dto.state;
    city.country = dto.country;

    return await this.cityRepository.save(city);
  }

  isValidParams(dto: CreateCityDto): boolean {
    return !!(dto && dto.name && dto.region && dto.state && dto.country);
  }
}