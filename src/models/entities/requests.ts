import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user";

@Entity()
export class Request {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.requests)
    user: User;

    @Column({ type: "enum", enum: ["repair", "complaint", "suggestion"] })
    category: string;

    @Column("text")
    description: string;

    @Column({ type: "enum", enum: ["pending", "in_progress", "resolved"], default: "pending" })
    status: string;
}
