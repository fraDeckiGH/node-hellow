import mongoose from "mongoose";


/* export  *//* interface IProduct extends mongoose.Document {
  // _id: string,
	
	name: {
		required: true,
		type: String,
    // unique: true,
	},
	
	price: {
		required: true,
		type: Number,
	},
} */


const productSchema = new mongoose.Schema({
	__v: {
		// doesn't work when 'type' is not set
		select: false,
		type: Number,
	},
	
	_id: mongoose.Schema.Types.ObjectId,
	
	name: {
		required: true,
		type: String,
    // unique: true,
	},
	
	price: {
		required: true,
		type: Number,
	},
});



export const Product = 
	mongoose.model/* <IProduct> */('Product', productSchema);

// export { Product };



















