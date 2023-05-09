import { Router } from "express";
import userControllers from "../controllers/user-controllers";
import { validate } from "../utils/Commonfunctions";

const router = Router();

router.get("/", userControllers.getAll);
router.get("/:id", userControllers.getById);
router.post("/", userControllers.create);
router.put("/:id", userControllers.updateById);
router.delete("/:id", userControllers.deleteById);

export default router;
