import { Association } from '../../domain/association.entity';
import { CreateAssociationDto } from '../../domain/dto/association.dto';
import { Repository } from 'typeorm';
import { CommentService } from '../../service/comment.service';
import { InjectRepository } from '@nestjs/typeorm';

export class CreateAssociationUseCase {
  constructor(
    @InjectRepository(Association)
    private readonly associationRepository: Repository<Association>,
  ) {}

  async execute(dto: CreateAssociationDto): Promise<Association> {
    if (!this.isValidParams(dto)) {
      throw new Error('[CreateAssociationUseCase] Parâmetros inválidos.');
    }

    const association = new Association();

    association.name = dto.name;
    association.document = dto.document;

    return await this.associationRepository.save(association);
  }

  isValidParams(dto: CreateAssociationDto): boolean {
    return !!(dto && dto.name && dto.document);
  }
}