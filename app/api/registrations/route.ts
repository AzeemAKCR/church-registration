import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import RegistrationModel, { Registration } from "../../../models/Registration";

export async function GET() {
  try {
    await connectDB();
    const docs = await RegistrationModel.find()
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    const registrations = docs.map(
      (doc) =>
        ({
          _id: String(doc._id),
          firstName: String(doc.firstName),
          lastName: String(doc.lastName),
          age: Number(doc.age),
          gender: String(doc.gender) as "male" | "female",
          gradeLevel: String(doc.gradeLevel),
          address: String(doc.address),
          primaryNumber: String(doc.primaryNumber),
          secondaryNumber: String(doc.secondaryNumber),
          description: doc.description ? String(doc.description) : undefined,
          createdAt: new Date(doc.createdAt).toISOString(),
          updatedAt: new Date(doc.updatedAt).toISOString(),
        } satisfies Registration)
    );

    return NextResponse.json({ registrations });
  } catch (error) {
    console.error("Failed to fetch registrations:", error);

    if (error instanceof Error) {
      if (error.name === "MongooseServerSelectionError") {
        return NextResponse.json(
          { error: "Database connection timeout. Please try again." },
          { status: 504 }
        );
      }

      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "Failed to fetch registrations" },
      { status: 500 }
    );
  }
}
