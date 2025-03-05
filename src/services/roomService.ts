import { AppDataSource } from "../models/db";
import { CreateRoomDto, UpdateRoomDto } from "../models/dto/room.dto";
import { Room } from "../models/entities/room";
import { Like, Repository } from "typeorm";

export class RoomService {
    private readonly roomRepository: Repository<Room>

    constructor() {
        this.roomRepository = AppDataSource.getRepository(Room);
    }

    async create(data: CreateRoomDto): Promise<Room> {
        const room = this.roomRepository.create(data);
        await this.roomRepository.save(room);

        return room;
    }

    async modify(roomId: number, data: UpdateRoomDto): Promise<Room> {
        const room = await this.roomRepository.findOneById(roomId);
        if (!room) {
            throw 'Không thấy phòng';
        }

        await this.roomRepository.update(roomId, data);
        const updateRoom = await this.roomRepository.findOneById(roomId);
        if (updateRoom) {
            await this.roomRepository.save(data);
        } else {
            throw 'KHông thể cập nhập';
        }

        return updateRoom;
    }

    async detail(roomId: number): Promise<Room> {
        const room = await this.roomRepository.findOneById(roomId);
        if (!room) {
            throw 'Không thấy phòng';
        }

        return room;
    }
    

    async list(page: number, limit: number, search?: string): Promise<{ total: number, page: number, limit: number, rooms: Room[] }> {
        const skip = (page - 1) * limit;

        const filterRoom = search ? [
            { name: Like(`%${search}%`) }
        ] : {};

        const [rooms, total] = await this.roomRepository.findAndCount({
            where: filterRoom,
            take: limit,
            skip: skip,
            order: { id: "DESC" },
        });
        return { total, page, limit, rooms };
    }
}