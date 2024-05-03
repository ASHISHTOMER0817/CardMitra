import { Order } from "@/models/userModel";
import dateFormat from "./dateFormat";
import { User } from "@/models/userModel";

import multer from 'multer'
import path from 'path';
import fs from 'fs';


//today's date
export const todaysDate = dateFormat(new Date());

export default async function ordersToday() {
	const noOfDelivery = await Order.find({ deliveryDate: todaysDate }).populate('user').sort({ otp: 1 });
	console.log(todaysDate, noOfDelivery)
	return { deliveries: noOfDelivery.length, noOfDelivery };
}




// Set up Multer storage configuration
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  const uploadDir = path.join(process.cwd(), 'public', 'static'); // Destination folder for uploaded files
	  fs.mkdirSync(uploadDir, { recursive: true }); // Create the directory if it doesn't exist
	  cb(null, uploadDir);
	},
	filename: function (req, file, cb) {
	  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
	  const fileExtension = path.extname(file.originalname);
	  cb(null, uniqueSuffix + fileExtension); // Set unique filename for uploaded file
	},
    });
    
    export const upload = multer({ storage });
    



