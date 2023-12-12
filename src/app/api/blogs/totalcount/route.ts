import Blogs from "@/dbConnection";
import { itemsPerPage, recentItem } from "@/utils/utils";

import { NextResponse } from "next/server";

export async function GET() {
  try {

    const totalCount = await Blogs.countDocuments().sort({ createdAt: -1 })
    .skip(recentItem);
    console.log(totalCount);
    
    return NextResponse.json({ totalCount }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}


