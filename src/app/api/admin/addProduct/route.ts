import Database from '@/database/database';
// import { Product } from '@/models/userModel';
// import { upload } from '@/app/components/lib';
import path from 'path';
import fs from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import { Options, Product } from '@/models/userModel';
import { dropdown } from '@/app/(admin)/adminAddProduct/[_id]/page';



Database();

export async function POST(request: NextRequest) {
      try {
            console.log('add product route working')
            const query = request.nextUrl.searchParams.get('query')
            if (query === 'option') {
                  const formData = await request.formData()
                  const optionName: any = formData.get('optionName')
                  const addOption = formData.get('addOption')
                  const optionObject: dropdown = JSON.parse(optionName)
                  const file = formData.get('file') as File

                  if (!file) {
                        return NextResponse.json({
                              message: 'upload an image', status: 400, success: false
                        })
                  }
                  if (addOption === 'card') {
                        const options = await Options.findOneAndUpdate({ id: 'options' }, { $push: { cards: optionObject } })
                        console.log(options, 'this is the options document')


                        const uploadDir = path.join(process.cwd(), 'public', 'cards');
                        const newFileName = optionObject.value + '.svg'
                        const filePath = path.join(uploadDir, newFileName);
                        const bytes = await file.arrayBuffer();
                        await fs.writeFile(filePath, Buffer.from(bytes));
                        console.log('still working ')
                        return NextResponse.json({
                              message: 'card has been added', success: true
                        })
                  }

                  const uploadDir = path.join(process.cwd(), 'public', 'static');
                  const newFileName = optionObject.value + '.svg'
                  const filePath = path.join(uploadDir, newFileName);
                  const bytes = await file.arrayBuffer();
                  await fs.writeFile(filePath, Buffer.from(bytes));
                  console.log('still working ')
                  const options = await Options.findOneAndUpdate({ id: 'options' }, { $push: { sites: optionObject } })
                  console.log(options, 'successful')
                  return NextResponse.json({
                        message: 'Site has been added', success: true
                  })

            }
            console.log('running else condition in add product')
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
            const siteObj: any = formData.get('site')
            const infoList: any = formData.get('info')

            const cards: dropdown[] = JSON.parse(cardObj)
            const site: dropdown = JSON.parse(siteObj)
            const info = JSON.parse(infoList)
            const zipCode = formData.get('zipCode')

            // console.log(file)
            if (!file) {
                  return NextResponse.json({
                        message: 'upload an image', status: 400, success: false
                  })
            }
            const uploadDir = path.join(process.cwd(), 'public', 'uploads');

            console.log('step 1')
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const newFileName = `${uniqueSuffix}-${file.name}`;
            const filePath = path.join(uploadDir, newFileName);
            console.log('step 2')
            const bytes = await file.arrayBuffer();
            console.log('step medium')
            console.log('filepath', filePath);
            await fs.writeFile(filePath, Buffer.from(bytes));

            console.log('still working ')
            const newProduct = await Product.create({
                  name,
                  commission: +commission!,
                  productLink,
                  price: +price!,
                  requirement: +requirement!,
                  address,
                  site,
                  cards,
                  image: newFileName,
                  info,
                  zipCode,
                  showOnHomePage: false

            })
            console.log(newProduct)

            return NextResponse.json({
                  message: 'Product added', success: true,
            })


      } catch {
            return NextResponse.json({
                  message: 'failed to add', success: false,
            })
      }
}




















