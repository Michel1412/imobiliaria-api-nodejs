import { Association } from '../../domain/association.entity';
import { Repository } from 'typeorm';
import { CommentService } from '../../service/comment.service';
import { UpdateAssociationDto } from 'src/domain/dto/association.dto';
import { InjectRepository } from '@nestjs/typeorm';

export class UpdateAssociationUseCase {
  constructor(
    @InjectRepository(Association)
    private readonly associationRepository: Repository<Association>,
    private readonly commentService: CommentService,
  ) {}

  async execute(id: string, update: UpdateAssociationDto): Promise<Association> {
    const association = await this.associationRepository.findOneBy({ id });
    if (!association) {
      throw new Error(`[UpdateAssociation] Nenhuma associação encontrada para id: ${id}`);
    }

    if (update.name) association.name = update.name;
    if (update.document) association.document = update.document;

    return this.associationRepository.save(association);
  }
}