export interface ITestimonial {
  id?: string;
  title: string;
  subtitle: string;
  link: string;
  image_url: File | null;
  active: boolean;
  uuid?: string;
}

export interface IUpdateTestimonial {
  data: ITestimonial;
  id: string;
}
