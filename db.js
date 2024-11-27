"use strict";
//db.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables
// Create a new pool instance
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
});
exports.default = pool;
