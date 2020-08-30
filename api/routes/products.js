import express from 'express';
import mongoose from 'mongoose';
import { Product } from '../models/product.js';


const router = express.Router();



router.delete("/:id", (req, res, next) => {
	// const id = req.params.id;
	
  Product.remove({ _id: req.params.id })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});


router.get("/", (req, res, next) => {
	Product.find()
    .exec()
    .then(docs => {
			console.log(docs);
			// if (docs.length >= 0) {
      res.status(200).json(docs);
			// } else {
			// 		res.status(404).json({
			// 				message: 'No entries found'
			// 		});
			// }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
		});
});


router.get("/:id", (req, res, next) => {
	// const id = req.params.id;
	
	Product.findById(req.params.id)
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ 
				error: err
			});
    });
});


router.patch("/:id", (req, res, next) => {
	// const id = req.params.id;
	// console.log("req.body", req.body);
	
	// DOESN'T WORK
	/* const updateOps = {};
	
  for (const ops of req.body) {
    console.log("ops", ops);
		updateOps[ops.propName] = ops.value;
		
	}
	console.log("updateOps", updateOps); */
	
  Product.update(
			{ _id: req.params.id }, 
			{ $set: req.body }
		)
		.exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});


router.post("/", (req, res, next) => {
	const { body } = req;
	// console.log("body", body)
	
	const product = new Product({
    _id: new mongoose.Types.ObjectId(),
		name: body.name,
		price: body.price
	});
	
	product.save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST requests to /products",
        createdProduct: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});




export { router as productRoutes };



