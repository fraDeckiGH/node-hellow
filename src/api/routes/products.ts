import { Request, Router } from 'express';
import { Document } from 'mongoose';
import multer from 'multer';
import { apiError } from '../../util';
import { Product } from '../models/product';


const router: Router = Router();
export { router as productRoutes };



// -------------------------------------
// e10  Uploading an Image 
// this code is close-minded =(

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

// END Uploading an Image
// -------------------------------------




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
      docs: docs
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


router.patch("/:id", async (req, res, next) => {
  
  delete req.body._id;
  
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
    apiError(e, res);
  }
  
});


router.post("/", upload.single("img"),
  async (req, res, next) => {
  
  const { body, file } = req;
  console.log("req.file", file);
  
	// const doc: Document = new Product(req.body);
  
  try {
    const doc: Document = await new Product({
      ...body,
      img: file && file.path
    }).save();
    console.log("created doc", doc);
    
    res.status(201).json({
      message: "Doc created",
      doc: doc,
    });
  } catch (e) {
    apiError(e, res);
  }
  
});









