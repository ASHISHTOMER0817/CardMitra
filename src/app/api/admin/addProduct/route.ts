import { NextRequest, NextResponse } from 'next/server';
import Database from '@/database/database';
import { Product } from '@/models/userModel';
// import { upload } from '@/app/components/lib';
import multer from 'multer';
import { join } from 'path';
import { writeFile } from 'fs/promises';

Database();


export async function GET(request: NextRequest) {
      try {
            // const data = await request.formData()
            // const file:File | null = data.get('file') as unknown as File

            // if(!File){
            //       return NextResponse.json({ message: 'Something went wrong, please try again later', success: false, status: 500 });
            // }

            // const bytes = await file.arrayBuffer()
            // const buffer = Buffer.from(bytes)

            // const path = join('/', 'tmp', file.name)
            // await writeFile(path,  buffer)
            // console.log(`open ${path} to see the uploaded file`)






            const _id = request.nextUrl.searchParams.get('_id')
            const product = await Product.findOne({_id:_id})




            // const upload = multer({ dest: 'uploads/' })

            // const image = uploadedFiles[0].path.replace(/\\/g, '/'); // Convert Windows path to Unix-style path
      //       const imageFile = request.json()
      //       console.log(imageFile)
      //      console.log(upload.single('imageFile'))
            // console.log(request.body)

            // Other form data
            // const formData = await request.json();
            // const { name, requirement, cards, site, address, productLink, price, commission } = formData;

            // const newProduct = await new Product({
            //       name,
            //       requirement,
            //       cards,
            //       site,
            //       address,
            //       productLink,
            //       image,
            //       price,
            //       commission,
            // });

            // await newProduct.save();

            return NextResponse.json({ message: 'The product has been added', success: true, status: 200, data:product });
      } catch (error) {
            console.error('Error uploading image:', error);
            return NextResponse.json({ message: 'Something went wrong, please try again later', success: false, status: 500 });
      }
}