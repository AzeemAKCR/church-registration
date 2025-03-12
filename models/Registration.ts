import mongoose from "mongoose";

const RegistrationSchema = new mongoose.Schema(
  {
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
      enum: ["male", "female"],
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
    primaryNumber: {
      type: String,
      required: true,
    },
    secondaryNumber: {
      type: String,
    },
    transport: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export type Registration = {
  _id: string;
  firstName: string;
  lastName: string;
  age: number;
  primaryNumber: string;
  secondaryNumber: string;
  gender: "male" | "female";
  gradeLevel: string;
  address: string;
  description?: string;
  transport?: string;
  createdAt: string;
  updatedAt: string;
};

const RegistrationModel =
  mongoose.models.Registration ||
  mongoose.model("Registration", RegistrationSchema);

export default RegistrationModel;
