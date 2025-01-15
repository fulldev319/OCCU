import { Router } from "express";
import {
  getAllData,
  createData,
  updateData,
  deleteData,
} from "../controllers/dataController";

const router = Router();
router.get("/", getAllData);
router.post("/", createData);
router.put("/:id", updateData);
router.delete("/:id", deleteData);

export default router;
