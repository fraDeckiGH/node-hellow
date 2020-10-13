import { Request, Router } from 'express';
import { Document } from 'mongoose';
import multer from 'multer';
import { apiError, ResponseId } from '../../util';
import checkAuth from '../middleware/check-auth';
import { Product } from '../models/product';


const router: Router = Router();
export { router as productRoutes };



// -------------------------------------
// image upload (e10)
// TODO export somewhere else

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    // ENOENT: no such file or directory
    // (Windows error, colon ':' is not accepted in filename)
    // fix found in comment section
    // cb(null, new Date().toISOString() + file.originalname);
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req: Request, 
  file: Express.Multer.File, cb: Function) => {
  console.log("qui", file);
  
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
    // accept file
    cb(null, true);
  } else {
    // reject file (no error, just ignore it)
    // error is "null"
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    // 5 MB (according to Max)
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

// END image upload
// -------------------------------------



router.delete("/:id", checkAuth, async (req, res, next) => {
  
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
  
});


router.patch("/:id", checkAuth, async (req, res, next) => {
  
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
  
});


router.post("/", checkAuth, upload.single("img"),
  async (req, res, next) => {
  
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
  
});









