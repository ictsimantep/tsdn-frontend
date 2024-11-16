export interface IHealths {
  id?: string;
  nama: string;
  jenis_kelamin: string;
  umur: string;
  bb: string;
  tb: string;
  systol: string;
  diastol: string;
  profesi: string;
  risk: string;
  bmi: string;
  recommendation_food: string;
  recommendation_sport: string;
  recommendation_medicine: string;
  uuid?: string;
}

export interface IUpdateHealths {
  data: IHealths;
  id: string;
  uuid?: string;
}
