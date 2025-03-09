import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Registration from '../../../models/Registration';

interface RegistrationData {
  _id: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  gradeLevel: string;
  address: string;
  description?: string;
  createdAt: string;
}

export async function GET() {
  try {
    await connectDB();
    const registrations = await Registration.find<RegistrationData>({})
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    return NextResponse.json({ registrations });
  } catch (error) {
    console.error('Failed to fetch registrations:', error);

    if (error instanceof Error) {
      if (error.name === 'MongooseServerSelectionError') {
        return NextResponse.json(
          { error: "Database connection timeout. Please try again." },
          { status: 504 }
        );
      }

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to fetch registrations" },
      { status: 500 }
    );
  }
}
