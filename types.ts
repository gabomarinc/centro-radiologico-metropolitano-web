
export interface Service {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  iconName: string;
  image: string;
  preparation: string[];
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
}
