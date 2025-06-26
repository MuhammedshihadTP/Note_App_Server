import { Router } from "express";
import authRoutes from "./auth.routes.js";
import noteRoutes from "./note.route.js";

const router = Router();

// Public Routes
router.use('/auth', authRoutes);

// Protected Routes (authMiddleware is applied inside noteRoutes)
router.use('/notes', noteRoutes);

export default router;
