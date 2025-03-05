"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = require("../controller/adminController");
const router = (0, express_1.Router)();
const adminController = new adminController_1.AdminCtroller();
router.post("/", adminController.create.bind(adminController));
router.post("/login", adminController.login.bind(adminController));
exports.default = router;
//# sourceMappingURL=admin.route.js.map