export interface User {
  id: string;
  name: string;
  surname?: string;
  company?: string;
  email: string;
  password?: string;
}

export const initialUserData: User = {
  id: '',
  name: '',
  surname: '',
  company: '',
  email: '',
};
