"use strict";
//char_info.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const router = express_1.default.Router();
router.get("/data", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const char_name = req.query.name;
    try {
        const results = yield db_1.default.query("SELECT * FROM char WHERE char_name ILIKE $1", [`%${char_name}%`]);
        res.json(results.rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
}));
router.post("/add-character", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { char_name, region, vision, weapon } = req.body;
    try {
        const result = yield db_1.default.query("INSERT INTO char (char_name, region, vision, weapon) VALUES ($1, $2, $3, $4) RETURNING *", [char_name, region, vision, weapon]);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error("Error adding character:", error);
        res.status(500).send("Server Error");
    }
}));
router.delete("/delete-character", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const char_name = req.body.char_name;
    if (!char_name) {
        return res.status(400).send("Character name is required.");
    }
    try {
        const result = yield db_1.default.query("DELETE FROM char WHERE char_name = $1", [
            char_name,
        ]);
        if (result.rowCount > 0) {
            res.status(200).send(`Character '${char_name}' deleted successfully.`);
        }
        else {
            res.status(404).send(`Character '${char_name}' not found.`);
        }
    }
    catch (error) {
        console.error("Error deleting character:", error);
        res.status(500).send("Failed to delete character.");
    }
}));
router.get("/characters", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield db_1.default.query("SELECT * FROM char");
        res.json(results.rows);
    }
    catch (error) {
        console.error("Error fetching characters:", error);
        res.status(500).send("Failed to fetch characters.");
    }
}));
exports.default = router;
