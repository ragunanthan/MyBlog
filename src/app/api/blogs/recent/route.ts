
export const dynamic = "force-dynamic";

import Blogs from "@/dbConnection";
import { NextResponse } from "next/server";

export async function GET(req: any, {params} : any) {
  try {
  
    const blogs = await Blogs.find()
    .sort({ createdAt: -1 }) // Sort in descending order based on timestamp
    .limit(4) ;
      console.count("render recent");
      
    return NextResponse.json({ data : blogs }, { status: 200 });
   
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}