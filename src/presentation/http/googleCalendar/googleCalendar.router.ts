import { Router } from "express";
import { Role } from "../../../domain/enums/enum";
import { googleController } from "./googleCalendar.controller";
import { authorize } from "../../middleware/authRole.middleware";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

router.get('/calendar',
    authMiddleware,
    authorize(Role.USER, Role.PROVIDER),
    googleController.getUserEvents
);

router.get("/connect",
    authMiddleware,
    authorize(Role.USER, Role.PROVIDER),
    googleController.connectGoogle
);

export default router;