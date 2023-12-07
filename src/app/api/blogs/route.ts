
import Blogs from "@/dbConnection";
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const blogs = await Blogs.find();
    
    return NextResponse.json({ data : blogs }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}

export async function POST(req : NextResponse) {
  try {
    const data = await req.formData()
    let object = {
      'title' :data.get("title"),
      'description' :data.get("description"),
      "category" :data.get("category"), 
      "active" :data.get("active"),
      "image" :data.get("image"),
    }
    console.log(object);
    const blob = await put(object?.image?.filename ?? "sd", object.image, {
      access: 'public',
    });
    // await Blogs.create(blogData);

    return NextResponse.json({ message: "Blog Created" }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}