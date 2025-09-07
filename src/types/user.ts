
export interface User {
  id: number;
  email: string;
  is_email_verified: boolean;
  first_name: string;
  last_name: string;
  display_name: string;
  avatar?: string;
}