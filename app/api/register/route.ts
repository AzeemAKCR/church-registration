import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import Registration, { IRegistration } from '../../../models/Registration';

type RegistrationInput = Omit<IRegistration, 'createdAt' | 'updatedAt'>;

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const data = await request.json() as RegistrationInput;
    
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
