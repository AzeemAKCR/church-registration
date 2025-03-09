import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Registration from '../../../models/Registration';

export async function GET() {
  try {
    await connectDB();
    const registrations = await Registration.find({})
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    return NextResponse.json({ registrations });
  } catch (error: any) {
    console.error('Failed to fetch registrations:', error);

    // Handle specific MongoDB errors
    if (error.name === 'MongooseServerSelectionError') {
      return NextResponse.json(
        { error: "Database connection timeout. Please try again." },
        { status: 504 }
      );
    }

    return NextResponse.json(
      { error: "Failed to fetch registrations" },
      { status: 500 }
    );
  }
}
