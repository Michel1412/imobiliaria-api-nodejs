export class CreateSellerDto {

  name: string;
  homeCityId: string;
  shopCityId: string;
  associationId: string;
  isWorking: boolean;
  
}

export class UpdateSellerDto {

  name?: string;
  homeCityId?: string;
  shopCityId?: string;
  associationId?: string;
  isWorking?: boolean;
  commentId?: string;

}