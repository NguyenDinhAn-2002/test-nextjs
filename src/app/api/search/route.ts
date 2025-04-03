import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { search } = await req.json();                
        const users = await prisma.user.findMany({
            where: {
                email: {
                    contains: search,
                    mode: 'insensitive', 
                },
            },                  

        })
        if (users.length === 0) {
            return NextResponse.json({ message: "Không tìm thấy người dùng!" }, { status: 404 });
        }
        // Trả về danh sách người dùng tìm thấy        
        return NextResponse.json({ users }, { status: 200 });
    } catch (error) {
        console.error("Lỗi server:", error);
        return NextResponse.json({ message: "Lỗi server!" }, { status: 500 });
    }
}