export interface IFooter {
  id?: string;
  title: string;
  subtitle: string;
  link: string;
  image_url: File | null;
  active: boolean;
  uuid?: string;
}

export interface IUpdateFooter {
  data: IFooter;
  id: string;
}
