import { Router } from "express";
import { register  , login, getMe} from "../controllers/auth";
import isToken from "../middlewares/isToken";

const router = Router();

router.route("/register").post(register);
router.route('/login').post(login)
router.route('/getMe').get(isToken, getMe)
export default router;
