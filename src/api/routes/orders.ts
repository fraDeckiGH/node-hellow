import { Router } from 'express';
import { Document } from 'mongoose';
import { apiError } from '../../util';
import { Order } from '../models/order';
import { Product } from '../models/product';


const router: Router = Router();
export { router as orderRoutes };




router.delete("/:id", async (req, res, next) => {
  
  try {
    // https://mongoosejs.com/docs/api/model.html#model_Model.findByIdAndDelete
    const doc: Document | null = 
      await Order.findByIdAndDelete(req.params.id);
    
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
    apiError(e, res);
  }
  
});


router.get("/", async (req, res, next) => {
  
  try {
    const docs: Document[] = await Order.find();
    console.log(
      `docs count ${docs.length}\n`, 
      docs
    );
    
    res.status(200).json({
      count: docs.length,
      docs: docs
    });
  } catch (e) {
    apiError(e, res);
  }
  
});


router.get("/:id", async (req, res, next) => {
    
  try {
    const doc: Document | null = 
      await Order.findById(req.params.id);
    
    if (doc) {
      console.log(doc);
      res.status(200).json(doc);
    } else {
      res.status(404).json({ 
        message: "Doc not found" 
      });
    }
  } catch (e) {
    apiError(e, res);
  }
  
});


router.post("/", async (req, res, next) => {
	
	const { body } = req;
  
  try {
		const productDoc: Document | null = 
			await Product.findById(body.product);
		
		if (productDoc) {
			const doc: Document = 
				await new Order(body).save();
			console.log("created doc", doc);
			
			res.status(201).json({
				message: "Doc created",
				doc: doc,
			});
		} else {
			res.status(404).json({ 
				message: "Product not found" 
			});
		}
  } catch (e) {
    apiError(e, res);
  }
  
});








