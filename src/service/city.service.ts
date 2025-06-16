import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from '../domain/city.entity';

@Injectable()
export class CityService {

  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
  ) {}

  async findAll(): Promise<City[]> {
    return this.cityRepository.find();
  }

  async findOne(id: string): Promise<City> {
    const city = await this.cityRepository.findOneBy({ id });

    if (!city) {
        throw new NotFoundException(`[CityService] Nenhuma cidade encontrada para id: ${id}`);
    }
    
    return city;
  }
}
