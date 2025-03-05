import { Router } from "express";
import { RoomController } from "../controller/roomController";

const router = Router();
const roomController = new RoomController();

router.post("/", roomController.create.bind(roomController));
router.put("/:roomId", roomController.modify.bind(roomController));
router.get("/", roomController.list.bind(roomController));
router.get("/:roomId", roomController.detail.bind(roomController));

export default router;