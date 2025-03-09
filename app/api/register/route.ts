import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import Registration from '../../../models/Registration';
import { MongooseError } from 'mongoose';

interface MongoDBError extends Error {
  name: string;
  code?: number;
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const data = await request.json();
    
    const registration = await Registration.create(data);
    
    return NextResponse.json({ 
      registration 
    }, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle specific MongoDB errors
    if (error instanceof Error) {
      const mongoError = error as MongoDBError;
      
      if (mongoError.name === 'MongooseServerSelectionError') {
        return NextResponse.json(
          { error: "Database connection timeout. Please try again." },
          { status: 504 }
        );
      }
      
      if (mongoError.name === 'ValidationError') {
        return NextResponse.json(
          { error: "Invalid registration data" },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to register" },
      { status: 500 }
    );
  }
}
