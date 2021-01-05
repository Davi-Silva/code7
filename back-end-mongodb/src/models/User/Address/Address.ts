import mongoose from 'mongoose';
import { IAddress } from '@interfaces/models/users/index';

const AddressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true,
  },
  suite: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  zip_code: {
    type: String,
    required: true,
  },
  geo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AddressGeo',
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
  updated_at: {
    type: Date,
    required: false,
  },
});

const Address = mongoose.model<IAddress>('Address', AddressSchema);

export default Address;
