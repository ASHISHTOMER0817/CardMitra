import { ObjectId } from "mongoose"

interface productList {
	productLink: string
	requirement: number
	cards: string[]
	site: string
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
	image:string
}
export default productList

export interface order {
	product: productList
	user: user
	orderId: string
	deliveryDate: string
	otp: boolean
	delivered: boolean
	orderedAt: string
	_id: string
	paid:boolean
}

export interface otp {
	orderObjectId: order
	contact: string
	userObjectId: user
	otp: number
	trackingId: string
	delivered: boolean
	_id:string
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
	_id:string
}

export interface UserDetails {
	user: user
	orderList: order[]
	totalAmt: number
}

export interface transactions{
	_id:string
	user:user
	dateOfPayment:string
	amount:number
}