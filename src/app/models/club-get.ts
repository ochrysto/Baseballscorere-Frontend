import { AssociationGet } from './association-get';

export interface ClubGet {
  id: number;
  name: string;
  city: string;
  logo: string;
  email: string;
  association: AssociationGet;
}
