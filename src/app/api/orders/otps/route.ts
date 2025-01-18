import { NextResponse, NextRequest } from "next/server";
import Database from "@/database/database";
import { Order } from "@/models/userModel";
import { bufferToStringOrders } from "@/app/components/bufferToString";
import GetToken from "@/app/components/getToken";

Database();

export async function GET(request: NextRequest) {
  try {
    const { _id, role } = await GetToken();

    // Get today's date in UTC
    const today = new Date();

    // Set start of the day (00:00:00 UTC)
    const startOfDayUTC = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 0, 0, 0, 0));

    // Set end of the day (23:59:59 UTC)
    const endOfDayUTC = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 23, 59, 59, 999));

    // Log to check the start and end times in UTC
    // console.log("Start of Day (UTC):", startOfDayUTC);
    // console.log("End of Day (UTC):", endOfDayUTC);


    if (role === "admin") {
      // Query to find all undelivered orders where OTP exists and otpDate is today's date
      const newOrder = await Order.find({otpDate: {$gte: startOfDayUTC, $lt: endOfDayUTC}})
      // console.log('new: ', newOrder);
      const orders = await Order.find({
        delivered: "undelivered",
        otp: { $exists: true, $ne: null },
        otpDate: { $gte: startOfDayUTC, $lt: endOfDayUTC },
      }).populate("product"); // Populate to get product details

      return NextResponse.json({ success: true, orders });

    } else if (role === "collaborator") {
      // Query for collaborator, adding a filter based on the populated product's collaborator field
      const orders = await Order.find({
        delivered: "undelivered",
        otp: { $exists: true, $ne: null },
        otpDate: { $gte: startOfDayUTC, $lt: endOfDayUTC},
      })
      .populate({
        path: "product",
        match: { collaborator: _id }, // Filter by collaborator in populated product
      });

      // Filter out any orders where product didn't match the collaborator filter
      const filteredOrders = orders.filter(order => order.product != null);

      return NextResponse.json({ success: true, orders: filteredOrders });

    } else {
      // Return access denied for other roles
      return NextResponse.json({
        message: "Cannot access",
        success: false,
      });
    }

  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong, Server error",
      success: false,
    });
  }
}
