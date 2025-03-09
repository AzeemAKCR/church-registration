import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Registration from '../../../models/Registration';

export async function GET() {
  try {
    await connectDB();
    const registrations = await Registration.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ registrations });
  } catch (err) {
    console.error('Failed to fetch registrations:', err);
    return NextResponse.json(
      { error: "Failed to fetch registrations" },
      { status: 500 }
    );
  }
}
