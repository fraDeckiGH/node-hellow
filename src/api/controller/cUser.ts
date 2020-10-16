import { NextFunction, Request, Response } from 'express';
import { Document } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { apiError, REGEX, ResponseId, makeString } from '../../util';
import { IUser, User } from "../model/mUser";



export async function deleteOne(
  req: Request, res: Response, next: NextFunction
) {
  
  try {
    // https://mongoosejs.com/docs/api/model.html#model_Model.findByIdAndDelete
    const doc: Document | null = 
      await User.findByIdAndDelete(req.params.id);
    
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
		const docs: Document[] = await User.find();
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
      await User.findById(req.params.id);
    
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


export async function login(
  req: Request, res: Response, next: NextFunction
) {
	
	const { body } = req;
	
	try {
		const user: IUser | null = 
			await User.findOne({ email: body.email });
		
		if (!user) {
			return res.status(401).json({
				id: ResponseId.Unauthorized,
			});
    }
    
    
    const same: boolean = 
      await bcrypt.compare(body.password, user.password);
    
    if (!same) {
      return res.status(401).json({
				id: ResponseId.Unauthorized,
			});
    }
    
    
    delete user.password;
    
    const token: string = jwt.sign(
      { ...user },
      makeString(process.env.JWT_KEY),
      {
        expiresIn: "1h"
      }
    );
    
    res.status(200).json({
      id: "authorized",
      token: token,
    });
    
  } catch (e) {
    apiError(e, res);
  }
  
}


export async function signup(
  req: Request, res: Response, next: NextFunction
) {
	
	const { body } = req;
	
	if (!(body.email).match(REGEX.EMAIL)) {
		return res.status(422).json({
			id: "invalid-email",
		});
	}
	
  try {
		const user: Document | null = 
			await User.findOne({ email: body.email });
		
		if (user) {
			return res.status(409).json({
				id: ResponseId.DocAlreadyExists,
			});
		}
		
		const encrypted: string = 
			await bcrypt.hash(body.password, 10);
		
		const doc: Document = await new User({
			...body,
			password: encrypted,
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










