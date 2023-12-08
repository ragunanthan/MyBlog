
import Blogs from "@/dbConnection";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const blogs = await Blogs.find()
    .sort({ createdAt: -1 }) // Sort in descending order based on timestamp
    .limit(4) ;
    
    return NextResponse.json({ data : blogs }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}