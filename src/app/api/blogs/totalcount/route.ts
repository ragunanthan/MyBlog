import Blogs from "@/dbConnection";
import { itemsPerPage, recentItem } from "@/utils/const";

import { NextResponse } from "next/server";

export async function GET() {
  try {

    const totalCount = await Blogs.countDocuments().sort({ createdAt: -1 })
    .skip(recentItem);
    
    return NextResponse.json({ totalCount }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}


