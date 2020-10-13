import { model, Schema, Types } from "mongoose";
import mongooseAutopopulate from "mongoose-autopopulate";
import { sortSchemaKeys, sortSchemaKeys2 } from "../../util";


const schema = new Schema({
	product: {
		autopopulate: true,
		ref: 'Product',
		required: true,
		type: Types.ObjectId,
	},
	
	quantity: {
		default: 1,
		type: Number,
	},
})
	.plugin(mongooseAutopopulate)
	
	// https://mongoosejs.com/docs/api/document.html#document_Document-toJSON

	// options to apply when this schema is applied to JSON
	// e.g API response
	.set('toJSON', {
		transform: (undefined, ret) => sortSchemaKeys(ret),
		versionKey: false
	})

	// options to apply when this schema is applied to Object
	// e.g console.log
	.set('toObject', {
		transform: (undefined, ret) => sortSchemaKeys(ret),
		versionKey: false
	});



export const Order = model('Order', schema);




















