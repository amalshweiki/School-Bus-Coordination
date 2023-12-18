import express from "express";
import {
  getBuses,
  getBus,
  addBus,
  updateBus,
  deleteBus,
} from "../controllers/busController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getBuses).post(protect, authorize("admin"), addBus);

router
  .route("/:id")
  .get(getBus)
  .put(protect, authorize("admin"), updateBus)
  .delete(protect, authorize("admin"), deleteBus);

export default router;
