import { Router } from 'express';
import { Document } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { apiError, REGEX, ResponseId } from '../../util';
import { IUser, User } from '../model/mUser';
import checkAuth from '../middleware/check-auth';


const router: Router = Router();
export { router as routerUser };




router.delete("/:id", checkAuth, async (req, res, next) => {
  
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
  
});


router.get("/", async (req, res, next) => {
  
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
  
});


router.get("/:id", async (req, res, next) => {
  
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
  
});


router.post("/login", async (req, res, next) => {
	
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
      process.env.JWT_KEY + "",
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
  
});


router.post("/signup", async (req, res, next) => {
	
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
  
});






