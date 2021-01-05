import mongoose from 'mongoose';
import { IDebt } from '@interfaces/models/users/index';

const DebtSchema = new mongoose.Schema({
  reason: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
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

const Debt = mongoose.model<IDebt>('Debt', DebtSchema);

export default Debt;
