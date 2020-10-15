import { NextFunction, Request, Response, Router } from 'express';
import { Document } from 'mongoose';
import multer from 'multer';
import { apiError, ResponseId } from '../../util';
import checkAuth from '../middleware/check-auth';
import { Product } from '../model/mProduct';



// export const pp = async (
//   req: Request, res: Response, next: NextFunction
// ) => {
  
//   const { body, file } = req;
//   console.log("req.file", file);
  
//   try {
//     const doc: Document = await new Product({
//       ...body,
//       img: file && file.path,
//     }).save();
//     console.log("created doc", doc);
    
//     res.status(201).json({
//       doc: doc,
//       id: ResponseId.DocCreated,
//     });
//   } catch (e) {
//     apiError(e, res);
//   }
  
// }

export async function pp(
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







