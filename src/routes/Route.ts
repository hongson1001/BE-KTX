import { Router } from "express";
import adminRouter from "./admin.route";
import userRouter from "./user.route";
import roomRouter from "./room.route";
import deviceRouter from "./device.route";
import rdRouter from "./room-device.route";

const router = Router();

router.use("/admin", adminRouter);
router.use("/user", userRouter);
router.use("/room", roomRouter);
router.use("/device", deviceRouter);
router.use("/room-device", rdRouter);

export default router;