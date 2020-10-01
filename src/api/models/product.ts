import { model, Schema } from "mongoose";


/* export  *//* interface IModel extends mongoose.Document {
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


const schema = new /* mongoose. */Schema({
	// __v: {
	// 	// doesn't work when 'type' is not set
	// 	// ? does this break sth?
	// 	select: false,
	// 	type: Number,
	// },
	
	// _id: /* mongoose. */Schema.Types.ObjectId,
	
	name: {
		required: true,
		type: String,
    // unique: true,
	},
	
	price: {
		required: true,
		type: Number,
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



export const Product = 
	/* mongoose. */model/* <IModel> */('Product', schema);

// export { Product };



















