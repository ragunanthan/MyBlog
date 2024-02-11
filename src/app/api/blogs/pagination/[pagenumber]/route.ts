import Blogs from "@/dbConnection";
import { itemsPerPage, recentItem } from "@/utils/const";

import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const id = parseInt(req.url.slice(req.url.lastIndexOf("/") + 1));

    const blogs = await Blogs.find()
      .sort({ createdAt: -1 })
      .skip((id - 1) * itemsPerPage + recentItem)
      .limit(itemsPerPage);
      console.count("render recent");
    return NextResponse.json({ data: blogs }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}


