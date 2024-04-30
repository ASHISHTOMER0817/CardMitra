import { ObjectId } from "mongoose";

interface productList {
	productLink: string;
	requirement: number
	quantity: number;
	name: string;
	randomNo: number;
	price: number;
	commission: number;
	_id: ObjectId,
	deals: boolean,
	show: boolean
	address: string,
	info: {
		first: string
		second: string
		third: string
		fourth: string
	}
}
export default productList;

export interface order {
	product: productList,
	user: user,
	orderId: string,
	deliveryDate: string,
	otp: boolean,
	delivered: boolean,
	orderedAt: string
	_id: ObjectId
}

export interface otp {
	orderObjectId: order,
	contact: string,
	userObjectId: user,
	otp: number,
	trackingId: string,
	delivered: boolean,
}

export interface user {
	name: string
	email: string
	contact: string
	password: string
	role: string
	notification: string[]
	isApprove: boolean
	createdAt: Date
}