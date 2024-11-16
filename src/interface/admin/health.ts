export interface IHealth {
  id?: string;
  nama: string;
  jenis_kelamin: string;
  umur: string;
  bb: string;
  tb: string;
  systol: string;
  diastol: string;
  profesi: string;
  risk?: string; // Mark as optional
  bmi?: string;  // Mark as optional
  recommendation_food?: string; // Mark as optional
  recommendation_sport?: string; // Mark as optional
  recommendation_medicine?: string; // Mark as optional
  uuid?: string;
}

export interface IUpdateHealth {
  data: IHealth;
  id: string;
  uuid?: string;
}
