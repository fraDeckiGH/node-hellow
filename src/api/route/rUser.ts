import { Router } from 'express';
import checkAuth from '../middleware/check-auth';
import { deleteOne, get, getOne, login, signup } from '../controller/cUser';


const router: Router = Router();
export { router as routerUser };



router.delete("/:id", checkAuth, deleteOne);

router.get("/", get);

router.get("/:id", getOne);

router.post("/login", login);

router.post("/signup", signup);








