import { Device } from "../models/entities/device";
import { Repository } from "typeorm";

export class DeviceService {
    private readonly deviceRepository: Repository<Device>
}