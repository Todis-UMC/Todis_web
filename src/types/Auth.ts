export interface LoginProps {
  email: string | null;
  password: string | null;
}

export interface UserProps {
  id: number;
  email: string;
  name: string;
  password: string;
}
