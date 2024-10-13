
import dbConnect from "../../../../../backend/config/dbConnect";
// import { registerUser } from "../../../../../backend/controllers/authControllers";
// import { createEdgeRouter } from "next-connect";
import { NextRequest, NextResponse } from "next/server";

import User from "../../../../../backend/models/user";


export async function POST(req: NextRequest) {
  dbConnect();

   const body = await req.json();

   const { name, email, password } = body;
 
   await User.create({
     name,
     email,
     password,
   });
 
   return NextResponse.json({
     success: true,
   });

}
