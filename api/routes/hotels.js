import express from "express";
import { createError } from "../utils/error.js";
import {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getHotels,
} from "../controllers/hotel.js";

const router = express.Router();

// all routes in here are starting with /hotels
//create
router.post("/", createHotel);
//update
router.put("/:id", updateHotel);
//delete
router.delete("/:id", deleteHotel);
//get
router.get("/:id", getHotel);
//get all
router.get("/", getHotels);

export default router;
