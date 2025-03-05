import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user";

@Entity()
export class Payment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.payments)
    user: User;

    @Column("decimal", { precision: 10, scale: 2 })
    amount: number;

    @Column({ type: "enum", enum: ["VNPay", "cash", "bank_transfer"] })
    payment_method: string;

    @Column({ type: "enum", enum: ["pending", "completed", "failed"], default: "pending" })
    status: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    payment_date: Date;
}
