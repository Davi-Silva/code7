import mongoose from 'mongoose';
import { ICompany } from '@interfaces/models/users/index';

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  catch_phrase: {
    type: String,
    required: true,
  },
  bs: {
    type: String,
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

const Company = mongoose.model<ICompany>('Company', CompanySchema);

export default Company;
