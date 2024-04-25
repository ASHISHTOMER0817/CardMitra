import { ObjectId } from "mongoose";

interface productList {
      productLink: string;
	requirement:number
	quantity: number;
	name: string;
	randomNo: number;
	price: number;
	commission: number;
	_id:ObjectId
}
export default productList;

export interface order{
	product:string,
	user:string,
	orderId:string,
	deliveryDate:string,
	otp:boolean,
	delivered:boolean,
	orderedAt:string
}
