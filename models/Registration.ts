import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IRegistration {
  firstName: string;
  lastName: string;
  age: number;
  gender: 'male' | 'female';
  gradeLevel: string;
  address: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRegistrationDocument extends IRegistration, Document {}

const RegistrationSchema = new Schema<IRegistrationDocument>({
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
}, {
  timestamps: true,
});

const Registration = (mongoose.models.Registration || mongoose.model<IRegistrationDocument>('Registration', RegistrationSchema)) as Model<IRegistrationDocument>;

export default Registration;
