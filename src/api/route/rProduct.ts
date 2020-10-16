import { Request, Router } from 'express';
import multer from 'multer';
import { deleteOne, get, getOne, patch, post } from '../controller/cProduct';
import checkAuth from '../middleware/check-auth';


const router: Router = Router();
export { router as routerProduct };



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



router.delete("/:id", checkAuth, deleteOne);

router.get("/", get);

router.get("/:id", getOne);

router.patch("/:id", checkAuth, patch);

router.post("/", checkAuth, upload.single("img"), post);









