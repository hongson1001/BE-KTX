import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Room } from "./room";

@Entity()
export class Device {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    device_name: string;

    @Column({ type: "enum", enum: ["working", "broken", "repairing"], default: "working" })
    status: string;

    @ManyToOne(() => Room, (room) => room.devices)
    room: Room;
}
