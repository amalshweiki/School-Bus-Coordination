import express from "express";
import {
  getSchools,
  getSchool,
  addSchool,
  updateSchool,
  deleteSchool,
} from "../controllers/schoolController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getSchools).post(protect, authorize("admin"), addSchool);
//router.route("/").get(getSchools).post(addSchool);
router
  .route("/:id")
  .get(getSchool)
  .put(protect, authorize("admin"), updateSchool)
  .delete(protect, authorize("admin"), deleteSchool);

export default router;
