import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "./user";
import { Device } from "./device";
import { RoomDevice } from "./room-devices";

@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: "enum", enum: ["male", "female", "other"] })
    gender: string;

    @Column()
    max_capacity: number;

    @OneToMany(() => RoomDevice, (roomDevice) => roomDevice.room)
    roomDevices: RoomDevice[];

    @OneToMany(() => User, (user) => user.room)
    users: User[]; 
}
