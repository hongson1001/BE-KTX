import { Router } from "express";
import adminRouter from "./admin.route";
import userRouter from "./user.route";
import roomRouter from "./room.route";

const router = Router();

router.use("/admin", adminRouter);
router.use("/user", userRouter);
router.use("/room", roomRouter);

export default router;