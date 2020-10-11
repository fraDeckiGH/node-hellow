import { Router } from 'express';
import { Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { apiError, REGEX, ResponseId } from '../../util';
import { User } from '../models/user';


const router: Router = Router();
export { router as userRoutes };




router.delete("/:id", async (req, res, next) => {
  
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


router.post("/signup", async (req, res, next) => {
	
	const { body } = req;
	
	if (!(body.email).match(REGEX.EMAIL)) {
		res.status(422).json({
			id: "invalid-email",
		});
		
		return;
	}
	
  try {
		const userDoc: Document | null = 
			await User.findOne({ email: body.email });
		
		if (userDoc) {
			res.status(409).json({
				id: ResponseId.DocAlreadyExists,
			});
			
			return;
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






