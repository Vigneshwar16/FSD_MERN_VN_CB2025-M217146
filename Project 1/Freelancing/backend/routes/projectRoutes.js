import express from "express";
import {
  fetchProject,
  fetchProjects,
  newProject,
  approveSubmission,
  rejectSubmission,
  submitProject
} from "../controllers/projectController.js";

const router = express.Router();

router.get("/fetch-project/:id", fetchProject);
router.get("/fetch-projects", fetchProjects);
router.post("/new-project", newProject);
router.get("/approve-submission/:id", approveSubmission);
router.get("/reject-submission/:id", rejectSubmission);
router.post("/submit-project",  submitProject);

export default router;
