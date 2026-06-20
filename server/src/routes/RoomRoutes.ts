import { Router } from "express";
import { protect } from "../Middleware/authMiddleware";
import { CreateRoom, GetJoinedRooms, JoinExistingRoom, LeaveRoom } from "../controller/roomController";

const router = Router();

router.post("/create", protect, CreateRoom);

router.get("/joined", protect, GetJoinedRooms);

router.post("/joinExistingRoom", protect, JoinExistingRoom);

router.post("/leave", protect, LeaveRoom);

export default router;