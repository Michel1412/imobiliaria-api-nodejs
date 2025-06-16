export class CreateCityDto {
  name: string;
  region: string;
  state: string;
  country: string;
}

export class UpdateCityDto {
  name?: string;
  region?: string;
  state?: string;
  country?: string;
}