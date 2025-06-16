import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { SellerService } from '../service/seller.service';
import { CreateSellerDto, UpdateSellerDto } from '../domain/dto/seller.dto';
import { CreateSellerUseCase } from 'src/use-case/create/create-seller.usecase';
import { UpdateSellerUseCase } from 'src/use-case/update/update-seller.usecase';
import { DeleteSellerUseCase } from 'src/use-case/delete/delete-seller.usecase';
import { ToggleSellerIsWorkingUseCase } from 'src/use-case/update/toggle-seller-isworking.usecase';

@Controller('/sellers')
export class SellerController {

  constructor(
    private readonly sellerService: SellerService,
    private readonly createSellerUseCase: CreateSellerUseCase,
    private readonly updateSellerUseCase: UpdateSellerUseCase,
    private readonly deleteSellerUseCase: DeleteSellerUseCase,
    private readonly toggleSellerIsWorkingUseCase: ToggleSellerIsWorkingUseCase,
) {}

  @Get('/')
  async findAll() {
    return this.sellerService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return this.sellerService.findOne(id);
  }

  @Post('/')
  async create(@Body() dto: CreateSellerDto) {
    return this.createSellerUseCase.execute(dto);
  }

  @Put('/:id/toggle-working')
  async togglerSellerIsWorking(@Param('id') id: string) {
    return this.toggleSellerIsWorkingUseCase.execute(id);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateSellerDto) {
    return this.updateSellerUseCase.execute(id, dto);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.deleteSellerUseCase.execute(id);
  }
}