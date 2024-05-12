import Database from '@/database/database';
// import { Product } from '@/models/userModel';
// import { upload } from '@/app/components/lib';
import path from 'path';
import fs from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import { Product } from '@/models/userModel';
import { dropdown } from '@/app/(admin)/adminAddProduct/[_id]/page';



Database();

export async function POST(request: NextRequest) {
      try {
            const formData = await request.formData()
            console.log(formData)
            const name = formData.get('name')
            const file = formData.get('file') as File
            const commission = formData.get('commission')
            const productLink = formData.get('productLink')
            const price = formData.get('price')
            const requirement = formData.get('requirement')
            const address = formData.get('address')
            const cardObj: any = formData.get('card')
            const siteObj:any = formData.get('site')
            const infoList: any = formData.get('info')

            const cards: dropdown[] = JSON.parse(cardObj)
            const site:dropdown = JSON.parse(siteObj)
            const info = JSON.parse(infoList)

            // console.log(file)
            if (!file) {
                  return NextResponse.json({
                        message: 'upload an image', status: 400, success: false
                  })
            }
            const uploadDir = path.join(process.cwd(), 'public', 'uploads');

            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const newFileName = `${uniqueSuffix}-${file.name}`;
            const filePath = path.join(uploadDir, newFileName);
            const bytes = await file.arrayBuffer();
            await fs.writeFile(filePath, Buffer.from(bytes));

            console.log('still working ')
            const newProduct = Product.create({
                  name,
                  commission: +commission!,
                  productLink,
                  price: +price!,
                  requirement: +requirement!,
                  address,
                  site,
                  cards,
                  image: newFileName,
                  info

            })
            console.log(newProduct)

            return NextResponse.json({
                  message: 'image uploaded successfully', success: true,
            })


      } catch {
            return NextResponse.json({
                  message: 'image upload failed', success: false,
            })
      }
}




















