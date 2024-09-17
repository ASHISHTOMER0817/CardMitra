import mongoose, { Schema } from "mongoose";

const passwordSchema = new mongoose.Schema({
	user: {
		type: String
	},
	password: {
		type: String
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
	// deliveryDate: {
	// 	type: String,
	// 	// required: true,
	// 	// format: Date
	// },
	otp: {
		default: false,
		type: Boolean
	},
	delivered: {
		type: String,

	},
	orderedAt: {
		type: Date,
		format: Date
	},
	paid: {
		type: Date || null,
		default: null
	},
	acknowledgment: {
		type: Boolean,
		default: false
	},
	ordererName:{
		type:String
	},
	trackingID: {         // New field for tracking information
		type: String,
		default: ""
	},
	deliveryDate: {      // New field for expected delivery date
		type: Date,
		default: null
	}
})

const otpSchema = new mongoose.Schema({
	orderObjectId: {
		type: mongoose.Schema.Types.ObjectId,
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
	delivered: {
		type: String,
		default: 'undelivered'
	},
	submittedAt: {
		type: Date
	},
	zipCode: {
		type: String
	},
	acknowledgment: {
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
	ifsc: {
		type: String
	},
	upi: {
		type: String
	},
	accountNo: {
		type: String
	},
	isApprove: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	paid: {
		type: Number,
		default: 0
	},
	unpaid: {
		type: Number,
		default: 0
	},

	resetPasswordToken: String,
	resetPasswordExpire: Date,
});

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		// required: true,
		// trim: true,
	},
	address: {
		type: String,
		// required: true,
	},
	image: {
		type: Buffer,
		// required:true
	},
	price: {
		type: Number,
		// required: true,
	},
	productLink: {
		type: String,
		// required: true,
	},
	requirement: {
		type: Number,
		// required: true,
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
	site: { type: mongoose.Schema.Types.ObjectId, ref: 'sites' },
	cards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'cards' }],

	deals: {
		type: Boolean,
		default: true,
	},

	commission: {
		type: Number,
	},
	show: {
		type: Boolean,
		default: true
	},
	info: {

		first: {
			type: String,
			default: "",
		},
		second: {
			type: String,
			default: ""
		},
		third: {
			type: String,
			default: ""
		},
		fourth: {
			type: String,
			default: ""
		},
	},
	zipCode: {
		type: String
	},
	showOnHomePage: {
		type: Boolean
	},
	returnAmount: {
		type: Number
	},
	Date:{
		type:Date
	}
});

const transactionSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users'
	},
	dateOfPayment: {
		type: Date
	},
	amount: {
		type: Number,
		required: true
	},
})

const dropDownOptionsSchema = new mongoose.Schema({
	id: {
		type: String,
		default: 'options'
	},
	cards: [{
		value: {
			type: String
		},
		label: {
			type: String
		}
	}],
	sites: [{
		value: {
			type: String
		},
		label: {
			type: String
		}
	}],
})

const cardSchema = new mongoose.Schema({
	value: { type: String },
	label: { type: String },
	image: { type: Buffer },
});

const siteSchema = new mongoose.Schema({
	value: { type: String },
	label: { type: String },
	image: { type: Buffer },
});

const reviewSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
	review: {
		type: String
	}
})

const lockSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true,
    },
    lockedAt: {
        type: Date,
        default: Date.now,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
});

const Product = mongoose.models.products || mongoose.model("products", productSchema)
const Otp = mongoose.models.otps || mongoose.model("otps", otpSchema)
const Order = mongoose.models.orders || mongoose.model("orders", orderSchema)
const User = mongoose.models.users || mongoose.model("users", userSchema);
const Password = mongoose.models.passwords || mongoose.model("passwords", passwordSchema)
const Transactions = mongoose.models.transactions || mongoose.model("transactions", transactionSchema)
const Options = mongoose.models.options || mongoose.model('options', dropDownOptionsSchema)
const Review = mongoose.models.reviews || mongoose.model('reviews', reviewSchema)

const Card = mongoose.models.cards || mongoose.model('cards', cardSchema)
const Site = mongoose.models.sites || mongoose.model('sites', siteSchema)

const Lock = mongoose.models.locks || mongoose.model('locks', lockSchema)

export { User, Password, Product, Otp, Order, Transactions, Options, Review, Card, Site, Lock }