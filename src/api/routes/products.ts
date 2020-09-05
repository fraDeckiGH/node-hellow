import express from 'express';
import mongoose from 'mongoose';
import { Product } from '../models/product';


const router = express.Router();



router.delete("/:id", (req, res, next) => {
	const id: unknown = req.params.id;
	
  Product.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Product deleted',
        request: {
          type: 'POST',
          url: 'http://localhost:3000/products',
          body: {
            name: 'String',
            price: 'Number'
          }
        }
      });
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
    .select("_id name price")
    .exec()
    .then(docs => {
			const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            name: doc.name,
            price: doc.price,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/products/" + doc._id
            }
          };
        })
      };
			// if (docs.length >= 0) {
      res.status(200).json(response);
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
    .select('_id name price')
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          product: doc,
          request: {
              type: 'GET',
              url: 'http://localhost:3000/products'
          }
      });
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
	const id: unknown = req.params.id;
	// console.log("req.body", req.body);
	
  Product.update(
			{ _id: id }, 
			{ $set: req.body }
		)
		.exec()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: 'Product updated',
        request: {
          type: 'GET',
          url: 'http://localhost:3000/products/' + id
        }
      });
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
        message: "Created product successfully",
        createdProduct: {
            name: result.name,
            price: result.price,
            _id: result._id,
            request: {
                type: 'GET',
                url: "http://localhost:3000/products/" + result._id
            }
        }
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



