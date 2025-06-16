export class CreateCommentDto {
  stars: number;
  comment?: string;
  profile: string;
}

export class UpdateCommentDto {
  stars?: number;
  comment?: string;
  profile?: string;
}

export class CreateAssignCommentDto {
  stars: number;
  comment?: string;
  profile: string;
  sellerId?: string;
  buyerId?: string;
}
