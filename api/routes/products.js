import express from 'express';


const router = express.Router();



router.get("/", (req, res, next) => {
	res.status(200).json({
		message: "Handling GET requests to /products"
	});
});


router.post("/", (req, res, next) => {
	const { body } = req;
	// console.log("body", body)
	
	const product = {
		name: body.name,
		price: body.price
	};
	
	res.status(201).json({
		message: "Handling POST requests to /products",
		createdProduct: product
	});
});




export { router as productRoutes };



