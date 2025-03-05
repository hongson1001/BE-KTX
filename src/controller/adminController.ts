import { Request, Response } from "express";
import { AdminService } from "../services/adminService";

export class AdminCtroller {
    private readonly adminService: AdminService;

    constructor() {
        this.adminService = new AdminService();
    }

    async create(req: Request, res: Response) {
        try {
            const admin = await this.adminService.create(req.body);
            res.status(201).send({ status: 201, message: 'Tạo tài khoản thành công', data: admin });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const token = await this.adminService.login(req.body);
            res.status(200).send({ status: 200, message: 'Đăng nhập t hành công', data: token });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }
}
