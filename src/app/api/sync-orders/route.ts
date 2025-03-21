"use server";
import GetToken from "@/app/components/getToken";
import { order as OrderInterface } from "@/interface/productList";
import { Order, Product } from "@/models/userModel";
import { NextResponse } from "next/server";
import { FilterQuery } from "mongoose";

// Define the response type
interface SyncResponse {
  success: boolean;
  matchedOrders: Array<any>;
  unmatchedIds: string[];
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    // Get the logged-in user's token
    const { _id, role } = await GetToken();
    const { trackingIds }: { trackingIds: string[] } = await request.json();

    console.log('tracking ids: ', trackingIds);

    // Base query
    let query: FilterQuery<OrderInterface> = {
      delivered: { $ne: "delivered" },
      $or: trackingIds.map((id) => ({
        trackingID: { $regex: `${id}`, $options: "i" }, // Ends with 'id'
      })),
    };

    console.log('query: ', query);

    if (role === "collaborator") {
      // Find product IDs associated with the collaborator
      const products = await Product.find({ collaborator: _id }, "_id");
      const productIds = products.map((product) => product._id);

      // Add product filtering to the query for collaborators
      query.product = { $in: productIds };
    }

    // Fetch orders based on the query
    const orders: OrderInterface[] = await Order.find(query).populate("product");

    console.log('orders: ', orders);

    // Extract matched and unmatched tracking IDs
    const matchedIds = orders.map((order) => order.trackingID);
    const unmatchedIds = trackingIds.filter((id) => {
      return !matchedIds.find((mid)=>mid.includes(id));
    });

    // Prepare the matched orders response
    const matchedOrders = orders.map((order) => ({
      trackingID: order.trackingID,
      orderDetails: order,
    }));

    // Return the result
    const response: SyncResponse = {
      success: true,
      matchedOrders,
      unmatchedIds,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error syncing orders:", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
