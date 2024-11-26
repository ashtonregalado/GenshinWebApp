//char_info.ts

import express, { Request, Response } from "express";
import pool from "./db";
import { GenshinCharacter } from "./type";

const router = express.Router();

router.get("/data", async (req: Request, res: Response) => {
  const char_name = req.query.name as string;

  try {
    const results = await pool.query<GenshinCharacter>(
      "SELECT * FROM char WHERE char_name ILIKE $1",
      [`%${char_name}%`]
    );

    res.json(results.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.post("/add-character", async (req: Request, res: Response) => {
  const { char_name, region, vision, weapon } = req.body;

  try {
    const result = await pool.query<GenshinCharacter>(
      "INSERT INTO char (char_name, region, vision, weapon) VALUES ($1, $2, $3, $4) RETURNING *",
      [char_name, region, vision, weapon]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error adding character:", error);
    res.status(500).send("Server Error");
  }
});

router.delete("/delete-character", async (req: Request, res: Response) => {
  const char_name = req.body.char_name;

  if (!char_name) {
    return res.status(400).send("Character name is required.");
  }

  try {
    const result = await pool.query("DELETE FROM char WHERE char_name = $1", [
      char_name,
    ]);

    if (result.rowCount > 0) {
      res.status(200).send(`Character '${char_name}' deleted successfully.`);
    } else {
      res.status(404).send(`Character '${char_name}' not found.`);
    }
  } catch (error) {
    console.error("Error deleting character:", error);
    res.status(500).send("Failed to delete character.");
  }
});

router.get("/characters", async (req: Request, res: Response) => {
  try {
    const results = await pool.query("SELECT * FROM char");
    res.json(results.rows);
  } catch (error) {
    console.error("Error fetching characters:", error);
    res.status(500).send("Failed to fetch characters.");
  }
});

export default router;
