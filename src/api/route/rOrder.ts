import { Router } from 'express';
import { Document } from 'mongoose';
import { apiError, ResponseId } from '../../util';
import { Order } from '../model/mOrder';
import { Product } from '../model/mProduct';
import checkAuth from '../middleware/check-auth';


const router: Router = Router();
export { router as routerOrder };




router.delete("/:id", checkAuth, async (req, res, next) => {
  
  try {
    // https://mongoosejs.com/docs/api/model.html#model_Model.findByIdAndDelete
    const doc: Document | null = 
      await Order.findByIdAndDelete(req.params.id);
    
    if (doc) {
      console.log("deleted doc", doc);
      
      res.status(200).json({
        doc: doc,
        id: ResponseId.DocDeleted,
      });
    } else {
      res.status(404).json({ 
        id: ResponseId.DocNotFound,
      });
    }
  } catch (e) {
    apiError(e, res);
  }
  
});


router.get("/", checkAuth, async (req, res, next) => {
  
  try {
    const docs: Document[] = await Order.find();
    console.log(
      `docs count ${docs.length}\n`, 
      docs
    );
    
    res.status(200).json({
      count: docs.length,
			id: ResponseId.DocsRetrieved,
			docs: docs,
    });
  } catch (e) {
    apiError(e, res);
  }
  
});


router.get("/:id", checkAuth, async (req, res, next) => {
  
  try {
    const doc: Document | null = 
      await Order.findById(req.params.id);
    
    if (doc) {
      console.log(doc);
      res.status(200).json({
				doc: doc,
				id: ResponseId.DocRetrieved,
			});
    } else {
      res.status(404).json({ 
        id: ResponseId.DocNotFound,
      });
    }
  } catch (e) {
    apiError(e, res);
  }
  
});


router.post("/", checkAuth, async (req, res, next) => {
	
	const { body } = req;
  
  try {
		const product: Document | null = 
			await Product.findById(body.product);
		
		if (product) {
			const doc: Document = 
				await new Order(body).save();
			console.log("created doc", doc);
			
			res.status(201).json({
				doc: doc,
				id: ResponseId.DocCreated,
			});
		} else {
			res.status(404).json({ 
				id: "product-not-found", 
			});
		}
  } catch (e) {
    apiError(e, res);
  }
  
});








