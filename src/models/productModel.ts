import mongoose from "mongoose"; 

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
    
    export default Product;