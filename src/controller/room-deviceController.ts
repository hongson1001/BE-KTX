import { Request, Response } from "express";
import { RoomDeviceService } from "../services/room-deviceService";

export class RoomDeviceController {
    private readonly rdService: RoomDeviceService;

    constructor() {
        this.rdService = new RoomDeviceService();
    }

    async create(req: Request, res: Response) {
        try {
            const response = await this.rdService.create(req.body);
            res.status(201).send({ status: 201, message: 'Thành công', data: response });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }

    async modify(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const response = await this.rdService.modify(Number(id), req.body);
            res.status(200).send({ status: 200, message: 'Sửa thành công', data: response });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }

    async listByRoom(req: Request, res: Response) {
        try {
            const roomId = parseInt(req.params.roomId);
            if (isNaN(roomId)) {
                return res.status(400).send({ status: 400, message: 'roomId không hợp lệ' });
            }

            const response = await this.rdService.listByRoom(roomId);
            return res.status(200).send({ status: 200, message: 'Thành công', data: response });
        } catch (error) {
            return res.status(500).send({
                status: 500,
                message: 'Có lỗi trong quá trình xử lý',
                error: error.message,
            });
        }
    }


    async list(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const search = req.query.search as string || "";
            const response = await this.rdService.list(page, limit, search);
            res.status(200).send({ status: 200, message: 'Thành công', data: response });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }

    async detail(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const response = await this.rdService.detail(Number(id));
            res.status(200).send({ status: 200, message: 'Thành công', data: response });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }

    async remove(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const response = await this.rdService.remove(Number(id));
            res.status(200).send({ status: 200, message: 'xoá thành công', data: response });
        } catch (error) {
            res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }
}