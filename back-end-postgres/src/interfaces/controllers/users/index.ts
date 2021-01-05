import { Request } from 'express';

export interface IUserPlaceholder {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface ICreateUserRequest {
  client: {
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
  };
  address: {
    street: string;
    suite: string;
    city: string;
    zipCode: string;
    geo: { lat: string; lng: string };
  };
  company: { name: string; catchPhrase: string; bs: string };
}
