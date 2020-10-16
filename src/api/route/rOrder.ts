import { Router } from 'express';
import checkAuth from '../middleware/check-auth';
import { deleteOne, get, getOne, post } from '../controller/cOrder';


const router: Router = Router();
export { router as routerOrder };



router.delete("/:id", checkAuth, deleteOne);

router.get("/", checkAuth, get);

router.get("/:id", checkAuth, getOne);

router.post("/", checkAuth, post);









