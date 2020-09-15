import express, { Router } from 'express';
import mongoose, { Document } from 'mongoose';
import { Product } from '../models/product';


const router: Router = express/* .Router */();
export { router as productRoutes };




router.delete("/:id", async (req, res, next) => {
  
  try {
    // https://mongoosejs.com/docs/api/model.html#model_Model.findByIdAndDelete
    const doc: Document | null = 
      await Product.findByIdAndDelete(req.params.id);
    
    if (doc) {
      console.log("deleted doc", doc);
      
      res.status(200).json({
        message: "Doc deleted",
        doc: doc
      });
    } else {
      res.status(404).json({ 
        message: "Doc not found" 
      });
    }
  } catch (e) {
    console.error(e);
    
    res.status(500).json({
      error: e
    });
  }
  
});


router.get("/", async (req, res, next) => {
  
  try {
    const docs: Document[] = await Product.find();
    console.log(
      `docs count ${docs.length}\n`, 
      docs
    );
    
    res.status(200).json({
      count: docs.length,
      docs: docs
    });
  } catch (e) {
    console.error(e);
    
    res.status(500).json({
      error: e
    });
  }
  
});


router.get("/:id", async (req, res, next) => {
    
  try {
    const doc: Document | null = 
      await Product.findById(req.params.id);
    
    if (doc) {
      console.log(doc);
      res.status(200).json(doc);
    } else {
      res.status(404).json({ 
        message: "Doc not found" 
      });
    }
  } catch (e) {
    console.error(e);
    
    res.status(500).json({
      error: e
    });
  }
  
});


router.patch("/:id", async (req, res, next) => {
  
  try {
    // https://mongoosejs.com/docs/api/model.html#model_Model.findByIdAndUpdate
    const doc: Document | null = 
      await Product.findByIdAndUpdate(
        req.params.id,
        
        // { $set: req.body }
        // All top level update keys which are not atomic 
        // operation names are treated as set operations
        req.body,
        
        { // options:
          
          // if true, return the modified document rather than 
          // the original. defaults to false (changed in 4.0)
          // new: true,
          
          // https://mongoosejs.com/docs/api/query.html#query_Query-mongooseOptions
          useFindAndModify: false
        }
      );
    
    if (doc) {
      console.log("initial doc", doc);
      // console.log("updated doc", doc);
      
      res.status(200).json({
        message: 'Doc updated',
        // initialDoc: doc,
        doc: doc,
      });
    } else {
      res.status(404).json({ 
        message: "Doc not found" 
      });
    }
  } catch (e) {
    console.error(e);
    
    res.status(500).json({
      error: e
    });
  }
  
});


router.post("/", async (req, res, next) => {
	
	// const product: Document = new Product(req.body);
  
  try {
    const doc: Document = 
      await new Product(req.body).save();
    console.log("created doc", doc);
    
    res.status(201).json({
      message: "Doc created",
      doc: doc,
    });
  } catch (e) {
    console.error(e);
    
    res.status(500).json({
      error: e
    });
  }
  
});




// OLDIES


// delete
// router.delete("/:id", (req, res, next) => {
// 	// const { id } = req.params;
	
//   Product.remove({ _id: req.params.id })
//     .exec()
//     .then(resp => {
//       res.status(200).json({
//         message: 'Doc deleted',
//         response: resp,
//         /* request: {
//           type: 'POST',
//           url: 'http://localhost:3000/products',
//           body: {
//             name: 'String',
//             price: 'Number'
//           }
//         } */
//       });
//     })
//     .catch(err => {
//       console.log(err);
      
//       res.status(500).json({
//         error: err
//       });
//     });
// });


// get
// router.get("/", (req, res, next) => {
//   Product.find()
//     // .select("_id name price")
//     .exec()
//     .then((docs: Document[]) => {
//       const count = docs.length;
      
//       console.log(
//         `docs count ${count}\n`, 
//         docs
//       );
      
// 			/* const resp = {
//         count: docs.length,
//         docs: docs.map(doc => {
//           return {
//             _id: doc._id,
//             name: doc.name,
//             price: doc.price,
//             // request: {
//             //   type: "GET",
//             //   url: "http://localhost:3000/products/" + doc._id
//             // }
//           };
//         })
//       }; */
// 			// if (docs.length >= 0) {
//       res.status(200).json({
//         count: count,
//         docs: docs
//       });
// 			// } else {
// 			// 		res.status(404).json({
// 			// 				message: 'No entries found'
// 			// 		});
// 			// }
//     })
//     .catch(err => {
//       console.log(err);
      
//       res.status(500).json({
//         error: err
//       });
// 		});
// });


// get single
// router.get("/:id", (req, res, next) => {
// 	// const { id } = req.params;
	
//   Product.findById(req.params.id)
//     // .select('_id name price')
//     // .select('name price') // doesn't work o.o
//     // .select("-__v")
//     .exec()
//     .then((doc: Document | null) => {
//       console.log(doc);
      
//       if (doc) {
//         /* res.status(200).json({
//           doc: doc,
//           // request: {
//           //     type: 'GET',
//           //     url: 'http://localhost:3000/products'
//           // }
//         }); */
//         res.status(200).json(doc);
//       } else {
//         res.status(404).json({ 
//           message: "No valid entry found for provided ID" 
//         });
//       }
//     })
//     .catch(err => {
//       console.log(err);
      
//       res.status(500).json({ 
// 				error: err
// 			});
//     });
// });


// patch
// router.patch("/:id", (req, res, next) => {
//   // const id: string = req.params.id;
// 	// console.log("req.body", req.body);
	
//   Product.update(
// 			{ _id: req.params.id }, 
// 			{ $set: req.body }
// 		)
// 		.exec()
//     .then((resp) => {
//       console.log(resp);
      
//       res.status(200).json({
//         message: 'Doc updated',
//         response: resp,
//         /* request: {
//           type: 'GET',
//           url: 'http://localhost:3000/products/' + id
//         } */
//       });
//     })
//     .catch(err => {
//       console.log(err);
      
//       res.status(500).json({
//         error: err
//       });
//     });
// });










