import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CommentService } from '../service/comment.service';
import { CreateAssignCommentDto, CreateCommentDto, UpdateCommentDto } from '../domain/dto/comment.dto';
import { CreateCommentUseCase } from 'src/use-case/create/create-comment.usecase';
import { UpdateCommentUseCase } from 'src/use-case/update/update-comment.usecase';
import { DeleteCommentUseCase } from 'src/use-case/delete/delete-comment.usecase';
import { CreateAndAssignCommentUseCase } from 'src/use-case/create/create-assign-comment.usecase';

@Controller('/comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly createCommentUseCase: CreateCommentUseCase,
    private readonly updateCommentUseCase: UpdateCommentUseCase,
    private readonly deleteCommentUseCase: DeleteCommentUseCase,
    private readonly createAndAssignCommentUseCase: CreateAndAssignCommentUseCase,
  ) {}

  @Get('/')
  async findAll() {
    return this.commentService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return this.commentService.findOne(id);
  }

  @Post('/assign')
    async createAndAssign(@Body() dto: CreateAssignCommentDto) {
    return this.createAndAssignCommentUseCase.execute(dto);
  }

  @Post('/')
  async create(@Body() dto: CreateCommentDto) {
    return this.createCommentUseCase.execute(dto);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateCommentDto) {
    return this.updateCommentUseCase.execute(id, dto);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.deleteCommentUseCase.execute(id);
  }
}
