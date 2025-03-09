import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import Registration from '../../../models/Registration';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const data = await request.json();
    
    const registration = await Registration.create(data);
    
    return NextResponse.json({ 
      registration 
    }, { status: 201 });

  } catch (err) {
    console.error('Registration error:', err);
    return NextResponse.json(
      { error: "Failed to register" },
      { status: 500 }
    );
  }
}
