import { model, Schema } from "mongoose";
import { REGEX } from "../../util";


const schema = new Schema({
	email: { 
		match: REGEX.EMAIL,
		required: true, 
		type: String, 
		unique: true, 
	},
	
	password: { 
		required: true, 
		type: String, 
	},
})
	// https://mongoosejs.com/docs/api/document.html#document_Document-toJSON

	// options to apply when this schema is applied to JSON
	// e.g API response
	.set('toJSON', {
		versionKey: false
	})

	// options to apply when this schema is applied to Object
	// e.g console.log
	.set('toObject', {
		versionKey: false
	});



export const User = model('User', schema);


















