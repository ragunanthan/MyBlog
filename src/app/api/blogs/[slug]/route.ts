
import Blogs from "@/dbConnection";
import { NextResponse } from "next/server";

export async function GET(req: any, {params} : any) {
  try {
    console.log(params.slug);
    if(params.slug === 'recent'){
    const blogs = await Blogs.find()
    .sort({ createdAt: -1 }) // Sort in descending order based on timestamp
    .limit(4) ;
    
    return NextResponse.json({ data : blogs }, { status: 200 });
    }
    return NextResponse.json({ message: "Not Found" }, { status: 404 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}