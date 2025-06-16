import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../../domain/comment.entity';
import { Seller } from '../../domain/seller.entity';
import { Buyer } from '../../domain/buyer.entity';
import { Property } from '../../domain/property.entity';
import { Association } from '../../domain/association.entity';
import { CreateAssignCommentDto } from '../../domain/dto/create-assign-comment.dto';

@Injectable()
export class CreateAndAssignCommentUseCase {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Seller)
    private readonly sellerRepository: Repository<Seller>,
    @InjectRepository(Buyer)
    private readonly buyerRepository: Repository<Buyer>,
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    @InjectRepository(Association)
    private readonly associationRepository: Repository<Association>,
  ) {}

  async execute(dto: CreateAssignCommentDto): Promise<Comment> {
    if (!dto.stars || !dto.profile) {
      throw new Error(`[CreateAndAssignCommentUseCase] Parâmetros inválidos`);
    }

    const newComment = new Comment();
    
    newComment.stars = dto.stars;
    newComment.profile = dto.profile;
    newComment.comment = dto.comment;

    if (dto.sellerId) {
      const seller = await this.sellerRepository.findOne({ where: { id: dto.sellerId } });
      if (!seller) throw new NotFoundException('[CreateAndAssignCommentUseCase] Vendedor não encontrado');
      newComment.seller = seller;
    }

    if (dto.buyerId) {
      const buyer = await this.buyerRepository.findOne({ where: { id: dto.buyerId } });
      if (!buyer) throw new NotFoundException('[CreateAndAssignCommentUseCase] Comprador não encontrado.');
      newComment.buyer = buyer;
    }

    if (dto.propertyId) {
      const property = await this.propertyRepository.findOne({ where: { id: dto.propertyId } });
      if (!property) throw new NotFoundException('[CreateAndAssignCommentUseCase] Propriedade não encontrado');
      newComment.property = property;
    }

    if (dto.associationId) {
      const association = await this.associationRepository.findOne({ where: { id: dto.associationId } });
      if (!association) throw new NotFoundException('[CreateAndAssignCommentUseCase] Imobiliaria não encontrado');
      newComment.association = association;
    }

    if (!dto.sellerId && !dto.buyerId && !dto.propertyId && !dto.associationId) {
      throw new NotFoundException('[CreateAndAssignCommentUseCase] Precisa ser passado algum id para que seja feito o relacionamento');
    }

    return await this.commentRepository.save(newComment);
  }
}