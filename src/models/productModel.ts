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

      profit: {
            type: Number,
      },

});

 const Product = mongoose.models.products || mongoose.model("Product", productSchema);
 export default Product;