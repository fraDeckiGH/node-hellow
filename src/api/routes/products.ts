import express, { Router } from 'express';
import mongoose, { Document } from 'mongoose';
import { Product } from '../models/product';


const router: Router = express.Router();
export { router as productRoutes };



router.delete("/:id", (req, res, next) => {
	// const { id } = req.params;
	
  Product.remove({ _id: req.params.id })
    .exec()
    .then(resp => {
      res.status(200).json({
        message: 'Doc deleted',
        response: resp,
        /* request: {
          type: 'POST',
          url: 'http://localhost:3000/products',
          body: {
            name: 'String',
            price: 'Number'
          }
        } */
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
    // .select("_id name price")
    .exec()
    .then((docs: Document[]) => {
      const count = docs.length;
      
      // ? test other backtick extension
      console.log(
        "docs count " + count + "\n", 
        docs
      );
      
      // console.log(
      //   `docs count ${count}\n`, 
      //   docs
      // );
      
			/* const resp = {
        count: docs.length,
        docs: docs.map(doc => {
          return {
            _id: doc._id,
            name: doc.name,
            price: doc.price,
            // request: {
            //   type: "GET",
            //   url: "http://localhost:3000/products/" + doc._id
            // }
          };
        })
      }; */
			// if (docs.length >= 0) {
      res.status(200).json({
        count: count,
        docs: docs
      });
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
	// const { id } = req.params;
	
  Product.findById(req.params.id)
    // .select('_id name price')
    // .select('name price') // doesn't work o.o
    // .select("-__v")
    .exec()
    .then((doc: Document | null) => {
      console.log(doc);
      
      if (doc) {
        /* res.status(200).json({
          doc: doc,
          // request: {
          //     type: 'GET',
          //     url: 'http://localhost:3000/products'
          // }
        }); */
        res.status(200).json(doc);
      } else {
        res.status(404).json({ 
          message: "No valid entry found for provided ID" 
        });
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
  // const id: string = req.params.id;
	// console.log("req.body", req.body);
	
  Product.update(
			{ _id: req.params.id }, 
			{ $set: req.body }
		)
		.exec()
    .then((resp) => {
      console.log(resp);
      
      res.status(200).json({
        message: 'Doc updated',
        response: resp,
        /* request: {
          type: 'GET',
          url: 'http://localhost:3000/products/' + id
        } */
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
	// const { body } = req;
	// console.log("body", body)
	
	const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    ...req.body
		// name: body.name,
		// price: body.price
	});
	
	product.save()
    .then((doc: Document) => {
      console.log("doc", doc);
      console.log("product", product);
      
      res.status(201).json({
        message: "Doc created",
        doc: doc,
        /* {
          _id: doc._id,
          name: doc.name,
          price: doc.price,
          // request: {
          //     type: 'GET',
          //     url: "http://localhost:3000/products/" + result._id
          // }
        } */
      });
    })
    .catch(err => {
      console.log(err);
      
      res.status(500).json({
        error: err
      });
    });
});








