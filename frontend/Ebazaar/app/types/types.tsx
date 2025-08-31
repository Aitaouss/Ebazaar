export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface userProducts {
  id: number;
  name: string;
  owner: string;
  title: string;
  imageUrl: string | null;
  content: string;
  price: number | null;
}

export interface LanguagesInterface {
  code: string;
  name: string;
  country_code: string;
}
