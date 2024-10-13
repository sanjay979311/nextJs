






// import { NextRequest, NextResponse } from 'next/server';
// import { v2 as cloudinary } from "cloudinary";
// import Product from '../../../../../backend/models/product';
// import dbConnect from '../../../../../backend/config/dbConnect';
// import { Readable } from 'stream';

// // Configure Cloudinary
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // DELETE function

// export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
//     try {
//         await dbConnect(); // Ensure db connection

//         const product = await Product.findById(params.id);
//         if (!product) {
//             return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
//         }

//         // Delete the image from Cloudinary
//         const publicId = product.product_img.split('/').pop()?.split('.')[0]; // Extract the public ID from Cloudinary URL
//         try {
//             await cloudinary.uploader.destroy(publicId as string); // Delete image from Cloudinary
//         } catch (err) {
//             console.error('Error deleting image from Cloudinary:', err);
//         }

//         // Delete the product from the database
//         await product?.deleteOne();

//         return NextResponse.json({
//             success: true,
//             message: "Product and image deleted successfully"
//         });
//     } catch (error) {
//         console.error('Error occurred:', error);
//         return NextResponse.json({
//             success: false,
//             message: "Failed to delete product"
//         }, { status: 500 });
//     }
// }


// // GET function
// export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
//     await dbConnect(); // Ensure db connection

//     const product = await Product.findById(params.id);
//     return NextResponse.json(product);
// }

// // PUT function
// export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
//     try {
//         const formData = await req.formData();
//         const file = formData.get('file') as File | null;
//         let product_img = "";

//         await dbConnect(); // Ensure db connection

//         const product = await Product.findById(params.id);
//         if (!product) {
//             return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
//         }

//         if (file) {
//             // If the file is uploaded, delete the old image from Cloudinary
//             if (product.product_img) {
//                 const publicId = product.product_img.split('/').pop()?.split('.')[0]; // Extract Cloudinary public ID
//                 await cloudinary.uploader.destroy(publicId as string);
//             }

//             // Upload new image to Cloudinary
//             const buffer = Buffer.from(await file.arrayBuffer());
//             const readableStream = new Readable();
//             readableStream.push(buffer);
//             readableStream.push(null);

//             const result = await new Promise((resolve, reject) => {
//                 const uploadStream = cloudinary.uploader.upload_stream(
//                     { folder: "demo" }, // Cloudinary folder
//                     (error, result) => {
//                         if (error) {
//                             reject(error);
//                         } else {
//                             resolve(result);
//                         }
//                     }
//                 );
//                 readableStream.pipe(uploadStream);
//             });

//             product_img = (result as any).secure_url; // Cloudinary URL for the new image
//         } else {
//             product_img = product.product_img; // Keep the existing image if no new one is uploaded
//         }

//         const title = formData.get('title') as string;
//         const product = formData.get('product') as string;
//         const description = formData.get('description') as string;

//         // Update the product
//         const updatedProduct = await Product.findByIdAndUpdate(
//             params.id,
//             { $set: { title, product, description, product_img } },
//             { new: true }
//         );

//         return NextResponse.json({ success: true, message: 'Product updated successfully', updatedProduct });
//     } catch (error) {
//         console.error('Error occurred:', error);
//         return NextResponse.json({ success: false, message: "Error occurred" }, { status: 500 });
//     }
// }







import { NextRequest, NextResponse } from 'next/server';
import { writeFile, unlink } from 'fs/promises';
import Product from '../../../../../backend/models/product';
import dbConnect from '../../../../../backend/config/dbConnect';
import path from 'path';
import fs from 'fs/promises';



export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await dbConnect(); // Await the database connection

        const product = await Product.findById(params.id);
        if (!product) {
            return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
        }

        // Delete the product from the database
        await product.deleteOne();

        // Delete the associated image file
        const productDir = path.join(process.cwd(), 'public', 'images', product.product_img);
        try {
            await fs.unlink(productDir); // Delete image from file system
        } catch (err) {
            console.error('Error deleting image:', err);
        }

        return NextResponse.json({
            success: true,
            message: "Record deleted successfully"
        });
    } catch (error) {
        console.error('Error occurred:', error);
        return NextResponse.json({
            success: false,
            message: "Failed to delete record"
        }, { status: 500 });
    }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    await dbConnect(); // Await the database connection
    const record = await Product.findById(params.id);

    return NextResponse.json(record);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File | null;
        let filename = "";



        const product = await Product.findById(params.id);
        if (!product) {
            return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
        }

        if (file && file.name) {
            // Check if the product image is the same as the uploaded file
            if (product.product_img === file.name) {
                filename = product.product_img;
            } else {
                // If there's an existing image, delete it
                if (product.product_img) {
                    const oldImagePath = path.join(process.cwd(), "public/images/", product.product_img);
                    await unlink(oldImagePath).catch((err) => console.log("Old image not found:", err));
                }
                // Create a new filename and save the new image
                filename = Date.now() + "_" + file.name.replace(/ /g, "_");
                const buffer = Buffer.from(await file.arrayBuffer());
                const newImagePath = path.join(process.cwd(), "public/images/", filename);
                await writeFile(newImagePath, buffer);
            }
        } else {
            filename = product.product_img; // Retain the existing image if no new file is uploaded
        }

        const title = formData.get('title') as string;
        const description = formData.get('description') as string;

        // Create a unique slug based on the name



        // Update the product with the new data
        const updatedProduct = await Product.findByIdAndUpdate(
            params.id,
            { $set: { title, description, product_img: filename } },
            { new: true }
        );

        return NextResponse.json({ success: true, message: 'Product Updated Successfully', updatedProduct });
    } catch (error) {
        console.log("Error occurred:", error);
        return NextResponse.json({ success: false, message: "Error occurred" }, { status: 500 });
    }
}

