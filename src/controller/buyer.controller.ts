import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { BuyerService } from '../service/buyer.service';
import { CreateBuyerDto, UpdateBuyerDto } from '../domain/dto/buyer.dto';
import { CreateBuyerUseCase } from 'src/use-case/create/create-buyer.usecase';
import { UpdateBuyerUseCase } from 'src/use-case/update/update-buyer.usecase';
import { DeleteBuyerUseCase } from 'src/use-case/delete/delete-buyer.usecase';

@Controller('/buyers')
export class BuyerController {
  constructor(
    private readonly buyerService: BuyerService,
    private readonly createBuyerUseCase: CreateBuyerUseCase,
    private readonly updateBuyerUseCase: UpdateBuyerUseCase,
    private readonly deleteBuyerUseCase: DeleteBuyerUseCase,
  ) {}

  @Get('/')
  async findAll() {
    return this.buyerService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return this.buyerService.findOne(id);
  }

  @Post('/')
  async create(@Body() dto: CreateBuyerDto) {
    return this.createBuyerUseCase.execute(dto);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateBuyerDto) {
    return this.updateBuyerUseCase.execute(id, dto);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.deleteBuyerUseCase.execute(id);
  }
}
