import express from 'express';


const router = express.Router();



router.delete('/:id', (req, res, next) => {
    res.status(200).json({
        message: 'Order deleted',
        orderId: req.params.orderId
    });
});


// Handle incoming GET requests to /orders
router.get('/', (req, res, next) => {
	res.status(200).json({
			message: 'Orders were fetched'
	});
});


router.get('/:id', (req, res, next) => {
	res.status(200).json({
			message: 'Order details',
			orderId: req.params.orderId
	});
});


router.post('/', (req, res, next) => {
	const { body } = req;
	// console.log("body", body)
	
	const order = {
			productId: body.productId,
			quantity: body.quantity
	};
	
	res.status(201).json({
			message: 'Order was created',
			order: order
	});
});




export { router as orderRoutes };