import mongoose from "mongoose";
// import Product from "./productModel";

const notificationsSchema = new mongoose.Schema({
	message: {
		type: String,
		timeStamp: {
			type: Date,
			default: Date.now()
		}
	}
})

// const ordersSchema = new mongoose.Schema({
// 	order: {
// 		type: mongoose.Schema.Types.ObjectId,
// 		ref: "products"
// 	},
// 	orderNumber: {
// 		type: String,
// 		required: true
// 	},
// 	deliveryDate: {
// 		type: Date,
// 		format: Date
// 	}
// })

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	number: {
		type: String,
		unique: true
	},
	password: {
		type: String,
	},
	role: {
		type: String,
		default: "user",
	},
	orders: [
		{
			order: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "products"
			},
			orderNumber: {
				type: String,
				required: true
			},
			deliveryDate: {
				type: Date,
				format:Date
			},
			otp:{
				default: false,
				type: Boolean
			},
			trackingId:{
				type:String,
			}

		}
	],
	delivered: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "products"
	}],

	notification: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "notifications"
	}],

	isApprove: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},

	resetPasswordToken: String,
	resetPasswordExpire: Date,
});

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	address: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	productLink: {
		type: String,
		required: true,
	},
	requirement: {
		type: Number,
		required: true,
		default: 0,
	},
	//   images: {
	//     type: Array,
	//     required: true,
	//     default:[
	//       "https://github.com/shaswata49/Node_Project/blob/main/frontend/src/images/Product/IMG-20230926-WA0000.jpg?raw=true",
	//       "https://github.com/shaswata49/Node_Project/blob/main/frontend/src/images/Product/IMG-20230926-WA0001.jpg?raw=true",
	//       "https://github.com/shaswata49/Node_Project/blob/main/frontend/src/images/Product/IMG-20230926-WA0002.jpg?raw=true"
	//     ]
	//   },
	cards: {
		type: String,
	},

	isAvail: {
		type: Boolean,
		default: true,
	},

	commission: {
		type: Number,
	},

});

// export interface IProduct extends Document {
//       name: string;
//       address: string;
//       price: number;
//       productLink: string;
//       requirement: number;
//       isAvail: boolean;
//       cards?: string;
//       commission?: number;
//     }

//     let Product: Model<IProduct>;

//     if (mongoose.models.Products) {
//       Product = mongoose.model<IProduct>('Products');
//     } else {
//       Product = mongoose.model<IProduct>('Products', productSchema);
//     }


const Product = mongoose.models.products || mongoose.model("products", productSchema)

const User = mongoose.models.users || mongoose.model("users", userSchema);
const Notifications = mongoose.models.notifications || mongoose.model("notifications", notificationsSchema)
export { User, Notifications, Product }