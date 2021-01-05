import { Document } from 'mongoose';

export interface IAdmin extends Document {
  _id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: null | Date;
}
