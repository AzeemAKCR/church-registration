import mongoose, { Document, Schema } from 'mongoose';

export interface IRegistration extends Document {
  firstName: string;
  lastName: string;
  age: number;
  gender: 'male' | 'female';
  gradeLevel: string;
  address: string;
  description?: string;
  createdAt: Date;
}

const RegistrationSchema = new Schema<IRegistration>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true,
  },
  gradeLevel: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

const Registration = mongoose.models.Registration || mongoose.model<IRegistration>('Registration', RegistrationSchema);

export default Registration;
