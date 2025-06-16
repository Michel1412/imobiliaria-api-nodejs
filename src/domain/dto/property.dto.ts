export class CreatePropertyDto {
  sellerId: string;
  name: string;
  value: number;
  isRentable: boolean;
  isPurchasable: boolean;
  description: string;
  images: string[];
  commentId?: string;
  adress: string;
  isOnHigh: boolean;
}

export class UpdatePropertyDto {
  sellerId?: string;
  name?: string;
  value?: number;
  isRentable?: boolean;
  isPurchasable?: boolean;
  description?: string;
  images?: string[];
  commentId?: string;
  adress?: string;
  isOnHigh?: boolean;
}

export class RentPropertyDto {
  buyerId: string;
  startDate: string;   // ISO string
  finishDate: string;  // ISO string
}