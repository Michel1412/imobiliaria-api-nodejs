import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { PropertyService } from '../service/property.service';
import { CreatePropertyDto, RentPropertyDto, UpdatePropertyDto } from '../domain/dto/property.dto';
import { CreatePropertyUseCase } from '../use-case/create/create-property.usecase';
import { UpdatePropertyUseCase } from '../use-case/update/update-property.usecase';
import { DeletePropertyUseCase } from '../use-case/delete/delete-property.usecase';

@Controller('/properties')
export class PropertyController {
  constructor(
    private readonly propertyService: PropertyService,
    private readonly createPropertyUseCase: CreatePropertyUseCase,
    private readonly updatePropertyUseCase: UpdatePropertyUseCase,
    private readonly deletePropertyUseCase: DeletePropertyUseCase,
    private readonly propertySelledUseCase: PropertySelledUseCase,
    private readonly propertyRentUseCase: PropertyRentUseCase,
  ) {}

  @Get('/')
  async findAll() {
    return this.propertyService.findAll();
  }
  
  @Get('/paginated')
  async findAllPaginated(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.propertyService.findAllPaginated(Number(page), Number(limit));
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return this.propertyService.findOne(id);
  }

  @Post('/')
  async create(@Body() dto: CreatePropertyDto) {
    return this.createPropertyUseCase.execute(dto);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() dto: UpdatePropertyDto) {
    return this.updatePropertyUseCase.execute(id, dto);
  }

  @Put('/:id/rent')
  async rentProperty(@Param('id') id: string, @Body() dto: RentPropertyDto) {
    return this.propertyRentUseCase.execute(id, dto);
  }

  @Delete('/:id/sell')
  async sellProperty(@Param('id') id: string, @Body('buyerId') buyerId: string) {
    return this.propertySelledUseCase.execute(id, buyerId);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.deletePropertyUseCase.execute(id);
  }
}
