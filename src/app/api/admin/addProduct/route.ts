import Database from '@/database/database';
// import { Product } from '@/models/userModel';
// import { upload } from '@/app/components/lib';
import path from 'path';
import fs from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import { Options, Product, Card, Site, User } from '@/models/userModel';
import { dropdown } from '@/app/(admin)/adminAddProduct/[_id]/page';
import sharp from "sharp"


import { Binary } from "mongodb"
import { cookies } from 'next/headers';



Database();

// export async function POST(request: NextRequest) {
//       try {
//             console.log('add product route working')
//             const query = request.nextUrl.searchParams.get('query')
//             if (query === 'option') {
//                   const formData = await request.formData()
//                   const optionName: any = formData.get('optionName')
//                   const addOption = formData.get('addOption')
//                   const optionObject: dropdown = JSON.parse(optionName)
//                   const file = formData.get('file') as File

//                   if (!file) {
//                         return NextResponse.json({
//                               message: 'upload an image', status: 400, success: false
//                         })
//                   }
//                   if (addOption === 'card') {
//                         const options = await Options.findOneAndUpdate({ id: 'options' }, { $push: { cards: optionObject } })
//                         console.log(options, 'this is the options document')


//                         const uploadDir = path.join(process.cwd(), 'public', 'cards');
//                         const newFileName = optionObject.value + '.svg'
//                         const filePath = path.join(uploadDir, newFileName);
//                         const bytes = await file.arrayBuffer();
//                         await fs.writeFile(filePath, Buffer.from(bytes));
//                         console.log('still working ')
//                         return NextResponse.json({
//                               message: 'card has been added', success: true
//                         })
//                   }

//                   const uploadDir = path.join(process.cwd(), 'public', 'static');
//                   const newFileName = optionObject.value + '.svg'
//                   const filePath = path.join(uploadDir, newFileName);
//                   const bytes = await file.arrayBuffer();
//                   await fs.writeFile(filePath, Buffer.from(bytes));
//                   console.log('still working ')
//                   const options = await Options.findOneAndUpdate({ id: 'options' }, { $push: { sites: optionObject } })
//                   console.log(options, 'successful')
//                   return NextResponse.json({
//                         message: 'Site has been added', success: true
//                   })

//             }
//             console.log('running else condition in add product')
//             const formData = await request.formData()
//             console.log(formData)
//             const name = formData.get('name')
//             const file = formData.get('file') as File
//             const commission = formData.get('commission')
//             const productLink = formData.get('productLink')
//             const price = formData.get('price')
//             const requirement = formData.get('requirement')
//             const address = formData.get('address')
//             const cardObj: any = formData.get('card')
//             const siteObj: any = formData.get('site')
//             const infoList: any = formData.get('info')

//             const cards: dropdown[] = JSON.parse(cardObj)
//             const site: dropdown = JSON.parse(siteObj)
//             const info = JSON.parse(infoList)
//             const zipCode = formData.get('zipCode')

//             // console.log(file)
//             if (!file) {
//                   return NextResponse.json({
//                         message: 'upload an image', status: 400, success: false
//                   })
//             }
//             // const uploadDir = path.join(process.cwd(), 'public', 'uploads');
//             const uploadDir = path.join(process.cwd(), 'uploads');
//             console.log('step 1')
//             const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//             const newFileName = `${uniqueSuffix}-${file.name}`;
//             const filePath = path.join(uploadDir, newFileName);
//             console.log('step 2')
//             const bytes = await file.arrayBuffer();
//             console.log('step medium')
//             console.log('filepath', filePath);

//             // Ensure the upload directory exists
//             try {
//                   await fs.mkdir(uploadDir, { recursive: true });
//                   console.log('Upload directory created or already exists');
//             } catch (err) {
//                   console.error('Failed to create directory:', err);
//                   return NextResponse.json({
//                   message: 'Failed to create upload directory', status: 500, success: false
//                   });
//             }


//             await fs.writeFile(filePath, Buffer.from(bytes));

//             console.log('still working ')
//             const newProduct = await Product.create({
//                   name,
//                   commission: +commission!,
//                   productLink,
//                   price: +price!,
//                   requirement: +requirement!,
//                   address,
//                   site,
//                   cards,
//                   image: newFileName,
//                   info,
//                   zipCode,
//                   showOnHomePage: false

//             })
//             console.log(newProduct)

//             return NextResponse.json({
//                   message: 'Product added', success: true,
//             })


//       } catch {
//             return NextResponse.json({
//                   message: 'failed to add', success: false,
//             })
//       }
// }









export async function POST(request: NextRequest) {
      try {
            // console.log('add product route working');
            const query = request.nextUrl.searchParams.get('query');

            if (query === 'option') {
                  const formData = await request.formData();
                  const optionName: any = formData.get('optionName');
                  const addOption = formData.get('addOption');
                  const optionObject: dropdown = JSON.parse(optionName);
                  const file = formData.get('file') as File;

                  if (!file) {
                        return NextResponse.json({
                              message: 'upload an image', status: 400, success: false
                        });
                  }

                  const fileBuffer = Buffer.from(await file.arrayBuffer());
                  const filename = `${optionObject.value}.svg`;

                  // Store the file directly in the document
                  const imageData = new Binary(fileBuffer);

                  if (addOption === 'card') {
                        await Card.create({ ...optionObject, image: imageData }
                        );
                  } else {
                        await Site.create({ ...optionObject, image: imageData }
                        );
                  }

                  return NextResponse.json({
                        message: `${addOption} has been added`, success: true
                  });
            }

            // Handle product upload
            const formData = await request.formData();
            const name = formData.get('name');
            // console.log('workin til her')
            const file = formData.get('file') as File | null;
            const existingImg = formData.get('existingImg') as string | null;
            const commission = formData.get('commission');
            const productLink = formData.get('productLink');
            const price = formData.get('price');
            const requirement = formData.get('requirement');
            const returnAmount = formData.get('returnAmt')
            // console.log(returnAmount)
            const address = formData.get('address');
            const cardObj: any = formData.get('card');
            const siteObj: any = formData.get('site');
            const infoList: any = formData.get('info');
            const collabObj: any = formData.get('collaborator')

            const cards: dropdown[] = JSON.parse(cardObj);
            const site: dropdown = JSON.parse(siteObj);
            const info = JSON.parse(infoList);
            const zipCode = formData.get('zipCode');
            const productId = formData.get('productId')
            // console.log('this is file', console.log(file?.type), 'below si the file', file)
            let fileBuffer;

            // Get collaborator ID from formData
            const collaboratorjson: dropdown = JSON.parse(collabObj);
            

            if (file || existingImg) {
                  let originalBuffer;
                  if (file) {
                        originalBuffer = Buffer.from(await file.arrayBuffer());
                  } else if (existingImg) {
                        const base64Data = existingImg.split(',')[1];
                        originalBuffer = Buffer.from(base64Data, 'base64');
                  }

                  if (originalBuffer) fileBuffer = await sharp(new Uint8Array(originalBuffer))
                        .resize({ width: 160, height: undefined, fit: 'contain' })
                        .webp()
                        .toBuffer();
            } else {
                  return NextResponse.json({
                        message: 'Upload an image', success: false, status: 400
                  });
            }

            const imageData = new Binary(fileBuffer);

            // Find the site document
            let siteDoc = await Site.findOne({ value: site.value });

            let collabDoc = await User.findOne({_id : collaboratorjson.value})

            console.log('collabDoc: ', collabDoc, collabDoc._id);

            // Find or create card documents
            const cardIds = await Promise.all(cards.map(async (card) => {
                  let cardDoc = await Card.findOne({ value: card.value });
                  return cardDoc._id;
            }));

            const productDetails = {
                  name,
                  commission: +commission!,
                  productLink,
                  price: +price!,
                  requirement: +requirement!,
                  address,
                  site: siteDoc._id,
                  cards: cardIds,
                  image: imageData,
                  info,
                  zipCode,
                  returnAmount: +returnAmount!,
                  collaborator: collabDoc._id,
                  showOnHomePage: false,
                  Date: new Date()
            }
            // console.log(productDetails, 'and:--', price)
            if (productId !== 'newProduct') {
                  // console.log('rng if candsn')
                  const existingProduct = await Product.findOneAndUpdate({ _id: productId }, { $set: { ...productDetails } }, { new: true })
                  // console.log('heyar is existing prdct', existingProduct)
                  return NextResponse.json({
                        message: 'Product updated', success: true,
                  });

            } else {

                  const newProduct = await Product.create({
                        ...productDetails
                  });
                  // console.log(newProduct, 'this newProduct')

                  return NextResponse.json({
                        message: 'Product added', success: true,
                  });
            }

      } catch (error) {
            console.error('Error:', error);
            return NextResponse.json({
                  message: 'failed to add', success: false,
            });
      }
}




















