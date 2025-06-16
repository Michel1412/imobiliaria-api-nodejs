import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AssociationService } from '../service/association.service';
import { CreateAssociationDto, UpdateAssociationDto } from '../domain/dto/association.dto';
import { CreateAssociationUseCase } from 'src/use-case/create/create-association.usecase';
import { UpdateAssociationUseCase } from 'src/use-case/update/update-association.usecase';
import { DeleteAssociationUseCase } from 'src/use-case/delete/delete-association.usecase';

@Controller('/associations')
export class AssociationController {
  constructor(
    private readonly associationService: AssociationService,
    private readonly createAssociationUseCase: CreateAssociationUseCase,
    private readonly updateAssociationUseCase: UpdateAssociationUseCase,
    private readonly deleteAssociationUseCase: DeleteAssociationUseCase,
  ) {}

  @Get('/')
  async findAll() {
    return this.associationService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return this.associationService.findOne(id);
  }

  @Post('/')
  async create(@Body() dto: CreateAssociationDto) {
    return this.createAssociationUseCase.execute(dto);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateAssociationDto) {
    return this.updateAssociationUseCase.execute(id, dto);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.deleteAssociationUseCase.execute(id);
  }
}
