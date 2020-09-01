import mongoose from "mongoose";


/* interface IProduct extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId,
	
	name: {
		required: true,
		type: String,
    // unique: true
	},
	
	price: {
		required: true,
		type: Number,
	},
} */


const productSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	
	name: {
		required: true,
		type: String,
    // unique: true
	},
	
	price: {
		required: true,
		type: Number,
	},
});


// export default mongoose.model('Product', productSchema);
const Product = mongoose.model/* <IProduct> */('Product', productSchema);
export { Product };



















