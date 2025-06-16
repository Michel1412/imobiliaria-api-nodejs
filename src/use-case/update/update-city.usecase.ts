import { UpdateCityDto } from 'src/domain/dto/city.dto';
import { City } from '../../domain/city.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export class UpdateCityUseCase {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>
) {}

  async execute(id: string, update: UpdateCityDto): Promise<City> {
    const city = await this.cityRepository.findOneBy({ id });
    if (!city) {
      throw new Error(`[UpdateCity] Nenhuma cidade encontrada para id: ${id}`);
    }

    if (update.name) city.name = update.name;
    if (update.region) city.region = update.region;
    if (update.state) city.state = update.state;
    if (update.country) city.country = update.country;

    return this.cityRepository.save(city);
  }
}