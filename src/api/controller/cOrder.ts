import { NextFunction, Request, Response } from 'express';
import { Document } from 'mongoose';
import { apiError, ResponseId } from '../../util';
import { Order } from '../model/mOrder';
import { Product } from '../model/mProduct';



export async function deleteOne(
  req: Request, res: Response, next: NextFunction
) {
  
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
  
}


export async function get(
  req: Request, res: Response, next: NextFunction
) {
  
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
  
}


export async function getOne(
  req: Request, res: Response, next: NextFunction
) {
  
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
  
}


export async function post(
  req: Request, res: Response, next: NextFunction
) {
	
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
  
}















