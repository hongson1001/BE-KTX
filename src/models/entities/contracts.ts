import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user";
import { Room } from "./room";

@Entity()
export class Contract {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.contracts)
    user: User;

    @ManyToOne(() => Room, (room) => room.users)
    room: Room;

    @Column({ type: "date" })
    start_date: string;

    @Column({ type: "date" })
    end_date: string;

    @Column({ type: "enum", enum: ["active", "terminated", "expired"], default: "active" })
    status: string;
}
