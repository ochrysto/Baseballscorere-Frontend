import {AssociationGet} from "./association-get";

export interface ClubGet {
  name: string;
  city: string;
  logo: string;
  email: string;
  association: AssociationGet;
}
