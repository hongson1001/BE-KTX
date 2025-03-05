"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminCtroller = void 0;
const adminService_1 = require("../services/adminService");
class AdminCtroller {
    constructor() {
        this.adminService = new adminService_1.AdminService();
    }
    async create(req, res) {
        try {
            const admin = await this.adminService.create(req.body);
            res.status(201).send({ status: 201, message: 'Tạo tài khoản thành công', data: admin });
        }
        catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }
    async login(req, res) {
        try {
            const token = await this.adminService.login(req.body);
            res.status(200).send({ status: 200, message: 'Đăng nhập t hành công', data: token });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
exports.AdminCtroller = AdminCtroller;
//# sourceMappingURL=adminController.js.map