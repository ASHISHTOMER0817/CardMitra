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
import productList, { order } from "@/interface/productList";
import bufferToString from "@/app/components/bufferToString";
dayjs.extend(utc)

Database()
export async function GET(request: NextRequest) {

      // function to calculate something below
      // async function noOfDays(key: string, value: string) {
      //       const order = await Order.find({ [key]: value })
      //       if (order.length <= 0) {
      //             return 0;
      //       } else {
      //             return order.length;
      //       }

      // }
      try {
            const searchparams = request.nextUrl.searchParams
            const query = searchparams.get('query')
            const _id = searchparams.get('_id')
            const operation = searchparams.get('operation')
            const syncOperation = searchparams.get('syncOperation')
            console.log('this is id', _id, operation)

            if (query === 'dashboard') {
                  let products = await Product.find({ deals: true })
                  .limit(3) 
                  .populate({path:'cards', select:'value image'})
                  .populate('site').lean();



                  // Converting images to base64 string
                  let orderHistory = products.map(product => ({
                        ...product,
                        image: product.image ? product.image.toString('base64') : null,
                        cards: product.cards.map((card:any) => ({
                              ...card,
                              image: card.image ? card.image.toString('base64') : null
                        })),
                        site: {
                              ...product.site,
                              image: product.site?.image ? product.site.image.toString('base64') : null
                        }
                  }));


                  //Affiliate Array
                  const affiliate = await User.find()
                  const noOfAffiliate = affiliate.length
                  console.log(noOfAffiliate)


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
                  console.log(arr)



                  console.log(syncOperation, 'this is sync Operation')
                  if (syncOperation === 'true') {
                        let otpList;

                        try {
                              const response = await axios.get('https://script.google.com/macros/s/AKfycbyuK5OcltMUfXOUKjbqzqQ9Rd8t23GB8UYMcEVvwBn1yzB2vryD5FhyGfsFVrX1RkW0og/exec');
                              otpList = response.data.data;
                              console.log('try part')
                        } catch (error) {
                              console.error('Error fetching data from Google Sheets:', error);
                              return NextResponse.json({ message: 'Failed to fetch data from Google Sheets', success: false });
                        }
                        let testBulkOprations = [];
                        console.log(otpList.length, 'this is otplist length')
                        for (let i = 0; i < otpList.length; i++) {
                              testBulkOprations.push({
                                    updateOne: {
                                          filter: { _id: otpList[i]._id },
                                          update: { $set: { delivered: otpList[i].deliveryStatus } },
                                          // upsert: false // Adjust based on whether you want to insert if not found
                                    }
                              })

                        }



                        console.log(testBulkOprations, 'bulkOperations')
                        // Execute bulkWrite
                        try {
                              const result = await Order.bulkWrite(testBulkOprations);
                              console.log('Bulk write result:', result);
                        } catch (bulkError) {
                              console.error('Error during bulkWrite:', bulkError);
                              return NextResponse.json({ message: 'Bulk write operation failed', success: false });
                        }
                  }

                  // const data = { orderHistory, deliveries, noOfAffiliate, order }
                  const data = { orderHistory, noOfAffiliate, order, arr }
                  console.log(data)

                  return NextResponse.json({
                        message: "Order history is being shown", status: false, data: data,
                  })

            } else if (query === 'orderHistory') {
                  // const orderHistory = await Product.find({ show: true }).sort({ deals: -1 });
                  // const orders = await Order.find({}).sort({ orderedAt: -1 }).populate('user', 'name').populate('product')
                  // console.log('1st console', orderHistory)
                  // if (orderHistory) {
                  // return NextResponse.json({
                  //       message: "Order history is being shown", status: false, data: { orderHistory, orders }
                  // })
                  // }


                     //    ------- .sort({ deals: -1 }) --------
                  console.log('hello')
                  const products:any = await Product.find({ show: true })
                  .populate({path:'cards', select:'value image'})
                  .populate('site').lean();
                  // console.log('this is product', products)
                        
                  let orders = await Order.find({})
                        .sort({ orderedAt: -1 })
                        .populate('user', 'name')
                        .lean();

                  const orderHistory = bufferToString(products)







                  // orders = orders.map(order => ({
                  //       ...order,
                  //       product: {
                  //             ...order.product,
                  //             image: order.product.image ? order.product.image.toString('base64') : null,
                  //             cards: order.product.cards.map((card:any) => ({
                  //                   ...card,
                  //                   image: card.image ? card.image.toString('base64') : null
                  //             })),
                  //             site: {
                  //                   ...order.product.site,
                  //                   image: order.product.site?.image ? order.product.site.image.toString('base64') : null
                  //             }
                  //       }
                  // }));
                  // console.log(orderHistory[0].cards,orderHistory[0].site , 'this is orders')

                  return NextResponse.json({
                        message: "Order history is being shown", status: false, data: {
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
