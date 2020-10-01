import { model, Schema, Types } from "mongoose";


const schema = new Schema({
	quantity: {
		default: 1,
		type: Number,
	},
	
	product: {
		ref: 'Product',
		required: true,
		type: Types.ObjectId,
	},
})
	// https://mongoosejs.com/docs/api/document.html#document_Document-toJSON

	// options to apply when this schema is applied to JSON
	// e.g API response
	.set('toJSON', { 
		// useProjection: true,
		versionKey: false
	})

	// options to apply when this schema is applied to Object
	// e.g console.log
	.set('toObject', { 
		// useProjection: true,
		versionKey: false
	});



export const Order = model('Order', schema);




















