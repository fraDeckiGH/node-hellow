import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	
	name: { 
		type: String, 
		// required: true 
	},
	
	price: { 
		type: Number, 
		// required: true 
	}
});


// export default mongoose.model('Product', productSchema);
const Product = mongoose.model('Product', productSchema);
export { Product };



















