import { NextResponse } from "next/server";

export async function POST(request: Request) {
  
  const blog: Blog = {
    meta: {
      tone: "Happy",
      model: "CHAT GTP3",
    },
    title: "How the world works",
    content: "Hello there world this is a blog",
  };

  return NextResponse.json({ blog });
}
