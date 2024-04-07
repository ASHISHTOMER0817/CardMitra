import mongoose from "mongoose";
import Product from "@/models/productModel";
export default async function Database() {
	try {
		await mongoose
			.connect(process.env.DB_URI!)
			.then(() => console.log("the MONGODB is connected"));
		const connection = mongoose.connection;

		// // Array of random phone names
		// const phoneNames = [
		// 	'iPhone 12',
		// 	'Samsung Galaxy S21',
		// 	'Google Pixel 5',
		// 	'OnePlus 8T',
		// 	'Xiaomi Mi 11',
		// 	'Sony Xperia 5 II',
		// 	'LG Velvet',
		// 	'Motorola Edge',
		// 	'Huawei P40 Pro',
		// 	'Nokia 8.3 5G'
		// ];

		// // Function to generate random integer within a range
		// const getRandomInt = (min: number, max: number) => {
		// 	return Math.floor(Math.random() * (max - min + 1)) + min;
		// };

		// // Function to generate and insert 10 random product documents
		// const insertRandomProducts = async () => {
		// 	try {
		// 		const products = [];
		// 		for (let i = 0; i < 10; i++) {
		// 			const randomName = phoneNames[getRandomInt(0, phoneNames.length - 1)];
		// 			const randomPrice = getRandomInt(500, 1500); // Random price between 500 and 1500
		// 			const randomProductLink = `https://example.com/products/${i + 1}`; // Example product link

		// 			const product = new Product({
		// 				name: randomName,
		// 				price: randomPrice,
		// 				address:"dfhgighighgu",
		// 				productLink: randomProductLink,
		// 				requirement: 0, // Default requirement
		// 				isAvail: true, // Default availability
		// 				commission: getRandomInt(5, 20) // Random commission between 5 and 20
		// 			});

		// 			products.push(product);
		// 		}

		// 		const result = await Product.insertMany(products);
		// 		console.log(`${result.length} products inserted successfully.`);
		// 	} catch (error) {
		// 		console.error('Error inserting products:', error);
		// 	} finally {
		// 		mongoose.connection.close(); // Close MongoDB connection after insertion (if needed)
		// 	}
		// };

		// // Call the function to insert random products
		// insertRandomProducts();

		connection.on("connected", () => {
			console.log("MongoDB connected successfully");
		});
		connection.on("error", (err) => {
			console.log(
				"MongoDB connection error. Please make sure MongoDB is running." +
				err
			);
			process.exitCode = 1;
		});

	} catch (error) {
		console.log("connection break...", error);
	}
}
