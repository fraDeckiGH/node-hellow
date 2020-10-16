import { NextFunction, Request, Response } from 'express';
import { Document } from 'mongoose';
import { apiError, ResponseId } from '../../util';
import { Product } from '../model/mProduct';



export async function deleteOne(
  req: Request, res: Response, next: NextFunction
) {
  
  try {
    // https://mongoosejs.com/docs/api/model.html#model_Model.findByIdAndDelete
    const doc: Document | null = 
      await Product.findByIdAndDelete(req.params.id);
    
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
    const docs: Document[] = await Product.find();
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
      await Product.findById(req.params.id);
    
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


export async function patch(
  req: Request, res: Response, next: NextFunction
) {
  
  const { body } = req;
  delete body._id;
  
  try {
    // https://mongoosejs.com/docs/api/model.html#model_Model.findByIdAndUpdate
    const doc: Document | null = 
      await Product.findByIdAndUpdate(
        req.params.id,
        
        // { $set: req.body }
        // All top level update keys which are not atomic 
        // operation names are treated as set operations
        body,
        
        { // options:
          
          // return the modified doc rather than the original
          // new: true,
          
          // https://mongoosejs.com/docs/api/query.html#query_Query-mongooseOptions
          useFindAndModify: false
        }
      );
    
    if (doc) {
      console.log("initial doc", doc);
      // console.log("updated doc", doc);
      
      res.status(200).json({
        // doc: doc,
        initialDoc: doc,
        id: ResponseId.DocUpdated,
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
  
  const { body, file } = req;
  console.log("req.file", file);
  
  try {
    const doc: Document = await new Product({
      ...body,
      img: file && file.path,
    }).save();
    console.log("created doc", doc);
    
    res.status(201).json({
      doc: doc,
      id: ResponseId.DocCreated,
    });
  } catch (e) {
    apiError(e, res);
  }
  
}







