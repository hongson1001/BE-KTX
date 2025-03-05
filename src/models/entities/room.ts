import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "./user";
import { Device } from "./device";

@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    room_number: string;

    @Column()
    capacity: number;

    @Column({ default: 0 })
    current_occupants: number;

    @Column("decimal", { precision: 10, scale: 2 })
    price: number;

    @Column({ type: "enum", enum: ["available", "full", "under_maintenance"], default: "available" })
    status: string;

    @OneToMany(() => User, (user) => user.room)
    users: User[];

    @OneToMany(() => Device, (device) => device.room)
    devices: Device[];
}
