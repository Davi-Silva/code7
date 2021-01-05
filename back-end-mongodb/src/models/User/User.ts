import mongoose from 'mongoose';
import { IUser } from '@interfaces/models/users/index';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    required: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
  debt: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Debt',
      required: true,
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    required: false,
  },
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
