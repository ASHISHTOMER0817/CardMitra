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
				ref: "Product"
			},
			orderNumber: {
				type: String,
				required: true
			},
			deliveryDate: {
				type: Date,
				format: Date
			}
		}
	],
	delivered: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Product"
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

const User = mongoose.models.users || mongoose.model("users", userSchema);
const Notifications = mongoose.models.notifications || mongoose.model("notifications", notificationsSchema)
export { User, Notifications }