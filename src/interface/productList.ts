import { ObjectId } from "mongoose"

interface productList {
	productLink: string
	requirement: number
	cards: { value: string, label: string, _id?: string }[]
	site: {
		value: string, label: string
	}
	quantity: number
	name: string
	randomNo: number
	price: number
	commission: number
	_id: string
	deals: boolean
	show: boolean
	address: string
	info: {
		first: string
		second: string
		third: string
		fourth: string
	}
	image: string,
	zipCode: string
}
export default productList

export interface order {
	product: productList
	user: user
	orderId: string
	deliveryDate: string
	otp: boolean
	delivered: string
	orderedAt: string
	_id: string
	paid: boolean
}

export interface otp {
	orderObjectId: order
	contact: string
	userObjectId: user
	otp: number
	trackingId: string
	delivered: string
	_id: string
	submittedAt: Date,
	zipCode: number
}

export interface user {
	name: string
	email: string
	contact: string
	password: string
	role: string
	ifsc: string
	upi: string
	accountNo: string
	isApprove: boolean
	createdAt: Date
	unpaid: number
	_id: string
	paid: number
}

export interface UserDetails {
	user: user
	orderList: order[]
	totalAmt: number
}

export interface transactions {
	_id: string
	user: user
	dateOfPayment: string
	amount: number
}

export interface Data {
	products: productList[];
	user: user;
}