import { Document } from 'mongoose';

export interface IUser extends Document {
  _id: string;
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
  created_at: Date;
  updated_at: null | Date;
}

export interface IDebt extends Document {
  _id: string;
  reason: string;
  amount: string;
  date: Date;
  created_at: Date;
  updated_at: null | Date;
}

export interface ICompany extends Document {
  _id: string;
  name: string;
  catch_phrase: string;
  bs: string;
  created_at: Date;
  updated_at: null | Date;
}

export interface IAddress extends Document {
  _id: string;
  street: string;
  suite: string;
  city: string;
  zip_code: string;
  created_at: Date;
  updated_at: null | Date;
}

export interface IAddressGeo extends Document {
  _id: string;
  lat: string;
  lng: string;
  created_at: Date;
  updated_at: null | Date;
}
