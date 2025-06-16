import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from '../domain/property.entity';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) {}

  async findAll(): Promise<Property[]> {
    return this.propertyRepository.find({ relations: ['seller', 'comments'] });
  }

  async findAllPaginated(page = 1, limit = 10): Promise<{ data: Property[]; total: number; page: number; limit: number }> {
    const skip = (page - 1) * limit;

    const [data, total] = await this.propertyRepository.findAndCount({
        relations: ['seller', 'comments'],
        skip,
        take: limit,
    });

    return { 
      data, 
      total, 
      page, 
      limit 
    };
  }

  async findOne(id: string): Promise<Property> {
    const property = await this.propertyRepository.findOne({ where: { id }, relations: ['seller', 'comment'] });
    if (!property) {
      throw new NotFoundException(`[PropertyService] Nenhuma propriedade encontrada para id: ${id}`);
    }
    return property;
  }
}
