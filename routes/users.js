import express from "express";
import{
    getUser,
    getUserFriends,
    addRemovedFriend,
}from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
/*read */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/*update */
router.patch("/:id/:friends", verifyToken, addRemovedFriend);

export default router;