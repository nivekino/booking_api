import express from "express";
import {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/user.js";
import verifyToken from "../utils/verifyToken.js";

const router = express.Router();

//create
router.post("/", verifyToken.protectWithJwt, createUser);
//update
router.put("/:id", updateUser);
//delete
router.delete("/:id", deleteUser);
//get
router.get("/:id", getUser);
//get all
router.get("/",verifyToken.protectWithJwt, getUsers);

export default router;
