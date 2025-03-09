import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import Registration from '../../../models/Registration';

interface RegistrationData {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  gradeLevel: string;
  address: string;
  description?: string;
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const data: RegistrationData = await request.json();
    
    const registration = await Registration.create(data);
    
    return NextResponse.json({ 
      registration 
    }, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);
    
    if (error instanceof Error) {
      if (error.name === 'MongooseServerSelectionError') {
        return NextResponse.json(
          { error: "Database connection timeout. Please try again." },
          { status: 504 }
        );
      }
      
      if (error.name === 'ValidationError') {
        return NextResponse.json(
          { error: "Invalid registration data" },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to register" },
      { status: 500 }
    );
  }
}
