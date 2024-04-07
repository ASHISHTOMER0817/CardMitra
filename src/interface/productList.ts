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


//