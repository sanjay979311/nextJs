


// import { NextRequest, NextResponse } from "next/server";
// import { v2 as cloudinary } from "cloudinary";
// import Product from "../../../../backend/models/product";
// import dbConnect from "../../../../backend/config/dbConnect";
// import { Readable } from 'stream';

// // Configure Cloudinary
// cloudinary.config({
//     cloud_name: "drajqohpv", // Replace with your Cloudinary cloud name
//     api_key: "864257176237652", // Replace with your Cloudinary API key
//     api_secret: "NcMS74B2Jf3nHnbBZxB9Xymzdg0", // Replace with your Cloudinary API secret
// });



// export async function GET() {

//     await dbConnect();

//     const list = await Product.find();

//     // Return the populated banners as a JSON response
//     return NextResponse.json(list);


// }

// export const POST = async (req: NextRequest) => {
  
//     await dbConnect();  // Ensure database connection is established

//     const formData = await req.formData();
//     // console.log('post data is =====>,')
//     // console.log('formData is =====>,',formData)
//     // return
//     const file: File | null = formData.get('file') as unknown as File;

//     if (!file) {
//         return NextResponse.json({ error: "No files received." }, { status: 400 });
//     }

//     try {
//         const buffer = Buffer.from(await file.arrayBuffer());

//         // Convert buffer to a readable stream
//         const readableStream = new Readable();
//         readableStream.push(buffer);
//         readableStream.push(null);

//         // Upload to Cloudinary using a promise
//         const result = await new Promise((resolve, reject) => {
//             const uploadStream = cloudinary.uploader.upload_stream(
//                 { folder: "demo" }, // Optional: specify folder in Cloudinary
//                 (error, result) => {
//                     if (error) {
//                         reject(error);
//                     } else {
//                         resolve(result);
//                     }
//                 }
//             );

//             readableStream.pipe(uploadStream);
//         });

       
//         const title = formData.get('title');
//         const description = formData.get('description');
//         const product_img = (result as any).secure_url;  // Cloudinary image URL

//         await Product.create({
            
//             title,
//             description,
//             product_img,
//         });

//         return NextResponse.json({ success: true, message: 'Product Added Successfully' });
//     } catch (error: any) {
//         console.log("Error occurred ", error);
//         return NextResponse.json({ success: false, error: error.message });
//     }
// };




import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import Product from '../../../../backend/models/product';
import dbConnect from "../../../../backend/config/dbConnect";



export const POST = async (req: NextRequest) => {
  await dbConnect();
  const formData = await req.formData();

  const file: File | null = formData.get('file') as unknown as File;

  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = Date.now() + "_" + file.name.replaceAll(" ", "_");

  try {
    await writeFile(path.join(process.cwd(), "public/images/", filename), buffer);

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const product_img = filename;


   

    let data = await Product.create({
        title,
      description,
      product_img,
      
    });

    return NextResponse.json({ success: true, message: 'Product added successfully',result:data });
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json({ success: false, message: 'Failed to add company' }, { status: 500 });
  }
};


export const GET = async (request: NextRequest) => {
  await dbConnect(); // Ensure dbConnect is awaited to complete the connection
  try {
    const list = await Product.find();
    return NextResponse.json(list);
  } catch (error) {
    console.error("Error occurred while fetching companies:", error);
    return NextResponse.json({ success: false, message: 'Failed to fetch companies' }, { status: 500 });
  }
};

