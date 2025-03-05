"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const db_1 = require("../models/db");
const admin_1 = require("../models/entities/admin");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
class AdminService {
    constructor() {
        this.adminRepository = db_1.AppDataSource.getRepository(admin_1.Admin);
    }
    async create(createAdminDto) {
        const existingAdmin = await this.adminRepository.findOne({
            where: { username: createAdminDto.username }
        });
        if (existingAdmin) {
            throw 'Tài khoản Admin này đã tồn tại';
        }
        const hassPass = await bcrypt_1.default.hash(createAdminDto.password, 10);
        const admin = this.adminRepository.create(Object.assign(Object.assign({}, createAdminDto), { password: hassPass }));
        await this.adminRepository.save(admin);
        return admin;
    }
    async login(loginDto) {
        const admin = await this.adminRepository.findOne({
            where: { username: loginDto.username }
        });
        if (!admin || !(await bcrypt_1.default.compare(loginDto.password, admin.password))) {
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
        const token = jsonwebtoken_1.default.sign(payload, process.env.ADMIN_SECRET_KEY, { expiresIn: '1h' });
        return token;
    }
}
exports.AdminService = AdminService;
//# sourceMappingURL=adminService.js.map