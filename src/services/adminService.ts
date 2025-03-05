import { AppDataSource } from "../models/db";
import { CreateAdminDto, LoginAdminDto } from "../models/dto/admin.dto";
import { Admin } from "../models/entities/admin";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';

dotenv.config();

export class AdminService {
    private adminRepository = AppDataSource.getRepository(Admin);

    async create(createAdminDto: CreateAdminDto): Promise<Admin> {
        const existingAdmin = await this.adminRepository.findOne({
            where: { username: createAdminDto.username }
        });
        if (existingAdmin) {
            throw 'Tài khoản Admin này đã tồn tại';
        }

        const hassPass = await bcrypt.hash(createAdminDto.password, 10);
        const admin = this.adminRepository.create({
            ...createAdminDto,
            password: hassPass,
        });
        await this.adminRepository.save(admin);
        return admin;
    }

    async login(loginDto: LoginAdminDto): Promise<any> {
        const admin = await this.adminRepository.findOne({
            where: { username: loginDto.username}
        });
        if (!admin || !(await bcrypt.compare(loginDto.password, admin.password))) {
            throw 'Tài khoản hoặc mật khẩu không đúng';
        }

        const payload = {
            username: admin.username,
            sub: admin.id,
            role: admin.role,
        };
        if (!process.env.ADMIN_SECRET_KEY) {
            throw new Error('ADMIN_SECRET_KEY is not defined');
        }
        const token = jwt.sign(payload, process.env.ADMIN_SECRET_KEY, { expiresIn: '1h' });

        return token;
    }
}