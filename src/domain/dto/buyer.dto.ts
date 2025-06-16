export class CreateBuyerDto {
  name: string;
  homeCityId: string;
  interresedCityId: string;
  rangeToSpend: number;
}

export class UpdateBuyerDto {
  name?: string;
  homeCityId?: string;
  interresedCityId?: string;
  rangeToSpend?: number;
  commentId?: string;
}