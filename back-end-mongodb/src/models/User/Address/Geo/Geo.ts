import mongoose from 'mongoose';
import { IAddressGeo } from '@interfaces/models/users/index';

const AddressGeoSchema = new mongoose.Schema({
  lat: {
    type: String,
    required: true,
  },
  lng: {
    type: Number,
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

const AddressGeo = mongoose.model<IAddressGeo>('AddressGeo', AddressGeoSchema);

export default AddressGeo;
