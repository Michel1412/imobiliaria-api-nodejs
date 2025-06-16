export class CreateAssociationDto {
  name: string;
  document: string;
}

export class UpdateAssociationDto {
  name?: string;
  document?: string;
  commentId?: string;
}