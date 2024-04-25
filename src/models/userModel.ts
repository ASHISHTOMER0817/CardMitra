import mongoose from "mongoose";

const notificationsSchema = new mongoose.Schema({
	message: {
		type: String,
		timeStamp: {
			type: Date,
			default: Date.now()
		}
	}
})

const orderSchema = new mongoose.Schema({
	product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "products"
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "users"
	},
	orderId: {
		type: String,
	},
	deliveryDate: {
		type: Date,
		required:true,
		format: Date
	},
	otp: {
		default: false,
		type: Boolean
	},
	delivered: {
		type: Boolean,
		default: false
	},
	orderedAt:{
		type: Date,
		format:Date
		
	}
})

const otpSchema = new mongoose.Schema({
	orderObjectId:{
		type:mongoose.Schema.Types.ObjectId,
		ref: "orders"
	},
	contact: {
		type: String,
		unique: true
	},
	userObjectId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "users"
	}, 
	otp: {
		type: Number,
		required: true
	},
	trackingId: {
		type: String,
	},
	delivered:{
		type: Boolean,
		default: false
	}
})


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
	contact: {
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

	deals: {
		type: Boolean,
		default: false,
	},

	commission: {
		type: Number,
	},
	show:{
		type:Boolean,
		default:true
	}

});

const Product = mongoose.models.products || mongoose.model("products", productSchema)
const Otp = mongoose.models.otps || mongoose.model("otps", otpSchema)
const Order = mongoose.models.orders || mongoose.model("orders", orderSchema)
const User = mongoose.models.users || mongoose.model("users", userSchema);
const Notifications = mongoose.models.notifications || mongoose.model("notifications", notificationsSchema)
export { User, Notifications, Product, Otp, Order }