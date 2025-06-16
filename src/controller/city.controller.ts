import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CityService } from '../service/city.service';
import { CreateCityDto, UpdateCityDto } from '../domain/dto/city.dto';
import { CreateCityUseCase } from 'src/use-case/create/create-city.usecase';
import { UpdateCityUseCase } from 'src/use-case/update/update-city.usecase';
import { DeleteCityUseCase } from 'src/use-case/delete/delete-city.usecase';

@Controller('/cities')
export class CityController {
  constructor(
    private readonly cityService: CityService,
    private readonly createCityUseCase: CreateCityUseCase,
    private readonly updateCityUseCase: UpdateCityUseCase,
    private readonly deleteCityUseCase: DeleteCityUseCase,
  ) {}

  @Get('/')
  async findAll() {
    return this.cityService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return this.cityService.findOne(id);
  }

  @Post('/')
  async create(@Body() dto: CreateCityDto) {
    return this.createCityUseCase.execute(dto);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateCityDto) {
    return this.updateCityUseCase.execute(id, dto);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.deleteCityUseCase.execute(id);
  }
}
