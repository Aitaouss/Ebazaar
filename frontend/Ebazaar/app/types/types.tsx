export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  picture: string | null;
  profileImage?: string | null;
  username: string;
  phone: number;
  location: string;
  language: string;
  verified: boolean;
  coverImage: string | null;
  isOnline: boolean;
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
