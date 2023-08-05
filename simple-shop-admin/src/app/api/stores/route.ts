import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { name } = await req.json();
    if (!userId) return new NextResponse("", { status: 401 });
    if (!name) return new NextResponse("Name is required", { status: 400 });

    await prismadb.store.create({
      data: {
        name,
        userId,
      },
    });

    return new NextResponse("", { status: 201 });

} catch (error) {
    console.log(error);
    return new NextResponse("", { status: 500 });
  }
}
