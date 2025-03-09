import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Registration from '../../../models/Registration';

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    
    const registration = await Registration.create(data);
    
    return NextResponse.json({ 
      message: "Registration successful", 
      registration 
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to register" },
      { status: 500 }
    );
  }
}
