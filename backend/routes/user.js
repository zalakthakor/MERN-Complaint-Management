import express from "express";
import auth, { validateUser, validateUserAdd } from "../auth/auth.js";

const router = express.Router();

import { createUser, signin} from "../controllers/user.js";


router.post("/signin",validateUser,signin);

router.post("/",validateUserAdd,auth,createUser);


export default router;