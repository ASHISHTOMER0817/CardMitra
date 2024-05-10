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
            // console.log(formData)
            const file = formData.get('file') as File
            const commission = formData.get('commission')
            const productLink = formData.get('productLink')
            const price = formData.get('price')
            const requirement = formData.get('requirement')
            const address = formData.get('address')
            const card: any = formData.get('card')
            const site = formData.get('site')
            const infoList:any = formData.get('info')

            const cardArr:dropdown[] = JSON.parse(card)
            // console.log(cardArr)
            const valueArr = []
            for(let i=0;i<cardArr.length;i++){
                  valueArr.push(cardArr[i].value)
            }
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

            const newProduct = Product.create({
                  commission: +commission!,
                  productLink,
                  price: +price!,
                  requirement: +requirement!,
                  address: address,
                  site,
                  cards:valueArr,
                  image:newFileName,
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




















