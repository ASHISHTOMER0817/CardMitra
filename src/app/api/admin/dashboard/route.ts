import { NextRequest, NextResponse } from "next/server";
import Database from "@/database/database";
import { Order, Otp, Product, User, Card, Site } from "@/models/userModel";
// import Dashboard from "@/app/(user)/dashboard/page";
// import dateFormat from "@/app/components/dateFormat";
import { todaysDate } from "@/app/components/lib";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc"
import axios from "axios";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import productList, { CardAndSite, order } from "@/interface/productList";
import bufferToString from "@/app/components/bufferToString";
import sharp from "sharp";
import { Binary } from "mongodb"
dayjs.extend(utc)

Database()
export async function GET(request: NextRequest) {
      try {
            const searchparams = request.nextUrl.searchParams
            const query = searchparams.get('query')
            const _id = searchparams.get('_id')
            const operation = searchparams.get('operation')
            const syncOperation = searchparams.get('syncOperation')

            const getLast7Days = () => {
                  const date = new Date();
                  date.setDate(date.getDate() - 7);
                  return date;
            };

            const checkDate = (dt: string) =>{
                  if(dt){
                        if(dt == 'null')return false;
                        return dt;
                  }
                  return false;
            }

            if (syncOperation === 'true') {
                  let otpList;

                  try {
                        // const response = await axios.get('https://script.google.com/macros/s/AKfycbwA7ltqd1DatJM0Od_rteBT1tgUy3msAQoItJZ6n0-csJDTZnC5fluiiU91C3wSKR0/exec');
                        const response = await axios.get('https://script.google.com/macros/s/AKfycbxhnf1drVrRutVdysp_FsOsrW0WLfyz_OGgU2jvZO86HBncHkY6vyOtHYkAeVFCu3Kw/exec');
                        otpList = response.data.data;
                        console.log('try part', otpList);
                  } catch (error) {
                        console.error('Error fetching data from Google Sheets:', error);
                        return NextResponse.json({ message: 'Failed to fetch data from Google Sheets', success: false });
                  }
                  let testBulkOprations = [];
                  console.log(otpList.length, 'this is otplist length')
                  for (let i = 1; i < otpList.length; i++) {

                        if (!mongoose.Types.ObjectId.isValid(otpList[i].OrderID.toString()) || otpList[i].status === 'undelivered') {
                              console.warn(`Skipping invalid OrderID: ${otpList[i].OrderID.toString()}`);
                              continue;
                        }

                        testBulkOprations.push({
                              updateOne: {
                                    filter: { _id: otpList[i].OrderID },
                                    update: { $set: { delivered: otpList[i].status } },
                                    // upsert: false // Adjust based on whether you want to insert if not found
                              }
                        })

                  }

                  console.log(testBulkOprations, 'bulkOperations')
                  // Execute bulkWrite
                  try {
                        const result = await Order.bulkWrite(testBulkOprations);
                        console.log('Bulk write result:', result);
                        return NextResponse.json({
                              message: "sync successful", success: true,
                        })
                  } catch (bulkError) {
                        console.error('Error during bulkWrite:', bulkError);
                        return NextResponse.json({ message: 'Bulk write operation failed', success: false });
                  }
            }

            if (query === 'dashboard') {
                  let products = await Product.find({ deals: true })
                        .limit(3)
                        .populate({ path: 'cards', select: 'value image' })
                        .populate('site').lean();



                  // Converting images to base64 string
                  let orderHistory = products.map(product => ({
                        ...product,
                        image: product.image ? product.image.toString('base64') : null,
                        cards: product.cards.map((card: any) => ({
                              ...card,
                              image: card.image ? card.image.toString('base64') : null
                        })),
                        site: {
                              ...product.site,
                              image: product.site?.image ? product.site.image.toString('base64') : null
                        }
                  }));

                  // const cards = await Card.find({})
                  // let testBulkOprations = [];
                  // console.log(cards)
                  // for (const card of cards) {

                  //       const base64Data = card.image;
                  //       const originalBuffer = Buffer.from(base64Data, 'base64');
                  //       const fileBuffer = await sharp(new Uint8Array(originalBuffer))
                  //             .resize({ width: 192, height: undefined, fit: 'contain' })
                  //             .webp()
                  //             .sharpen()
                  //             .toBuffer();
                  //       const imageData = new Binary(fileBuffer);

                  //       testBulkOprations.push({
                  //             updateOne: {
                  //                   filter: { _id: card._id },
                  //                   update: { $set: { image: imageData } },
                  //                   // upsert: false // Adjust based on whether you want to insert if not found
                  //             }
                  //       })

                  // }
                  // console.log('worked till here')



                  // console.log(testBulkOprations, 'bulkOperations of cards')
                  // // Execute bulkWrite
                  // const result = await Card.bulkWrite(testBulkOprations);
                  // console.log('Bulk write result:', result);



                  //Affiliate Array
                  const affiliate = await User.find()
                  const noOfAffiliate = affiliate.length


                  //Orders placed today
                  let order = 0
                  const Orders: order[] = await Order.find({})

                  let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                  for (const singleOrder of Orders) {
                        const currentYear = new Date().getFullYear()
                        const currentMonth = new Date().getMonth() + 1
                        const currentDay = new Date().getDate()
                        if (new Date(singleOrder.orderedAt).getFullYear() === currentYear && new Date(singleOrder.orderedAt).getMonth() + 1 === currentMonth && new Date(singleOrder.orderedAt).getDate() === currentDay) {
                              order += 1
                        }
                        arr[new Date(singleOrder.orderedAt).getMonth()] += 1

                  }

                  // const data = { orderHistory, deliveries, noOfAffiliate, order }
                  const data = { orderHistory, noOfAffiliate, order, arr }


                  return NextResponse.json({
                        message: "Order history is being shown", success: true, status: 200, data: data,
                  })

            } else if (query === 'orderHistory') {

                  const newDate = new Date();
                  const last7days = getLast7Days();

                  const startDate = checkDate(searchparams.get('startDate') || '') || last7days;
                  const endDate = checkDate(searchparams.get('endDate') || '') || newDate;

                  console.log('start date and end date : ', startDate, endDate);

                  const products: any = await Product.find({ show: true, Date: { $gte: startDate, $lte: endDate } })
                        .sort({ Date: -1 })
                        .populate({ path: 'cards', select: 'value image' })
                        .populate('site').lean();
                  // console.log('this is product', products)

                  let orders = await Order.find({
                        orderedAt: { $gte: startDate, $lte: endDate } 
                  })
                        .sort({ orderedAt: -1 })
                        .populate('user', 'name')
                        .populate('product')
                        .lean();

                  const orderHistory = bufferToString(products)

                  return NextResponse.json({
                        message: "Order history is being shown", success: true, data: {
                              // orderHistory: productsWithBase64Images,
                              // orders: ordersWithBase64Images
                              orderHistory, orders
                        }
                  })
            }
            else if (_id) {
                  const product = await Product.findOne({ _id: _id }).select('-image')
                  console.log('else if condition running', _id)
                  if (operation === 'remove') {

                        // await Product.findOneAndUpdate({ _id: _id }, { $set: { deals: false } })
                        product.deals = false;
                        product.save()
                        // console.log('deal removed')
                        return NextResponse.json({
                              message: "deal removed", success: true, operation
                        })
                  } else if (operation === 'add') {
                        // console.log('add condition')
                        product.deals = true;
                        product.save()
                        return NextResponse.json({
                              message: "deal added back", success: true, operation
                        })
                  } else if (operation === 'delete') {
                        // const deleteProduct = await Product.findOneAndUpdate(
                        //       { _id: _id },
                        //       { $set: { show: false } },
                        //       { new: true }
                        // );
                        //  console.log(deleteProduct)
                        product.show = false;
                        product.save()
                        return NextResponse.json({
                              message: "Product Deleted", success: true, operation
                        })
                  }
            }
      } catch {
            return NextResponse.json({
                  message: "Something went wrong please try again later", status: false
            })
      }

}
