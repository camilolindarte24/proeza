// src/env.ts
import Database from "better-sqlite3";

export interface Env {
  DB: Database.Database;
}

// Inicializa la base de datos y crea las tablas si no existen
export function initDB(path = "data.db"): Env {
  const db = new Database(path);

  // Tabla vehicles
  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS vehicles (
      license_plate TEXT PRIMARY KEY,
      brand TEXT,
      model TEXT,
      year INTEGER,
      engine_type TEXT,
      vehicle_type TEXT
    )
  `
  ).run();

  // Tabla parts_requests
  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS parts_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      license_plate TEXT,
      vehicle_info TEXT,
      part_description TEXT,
      customer_email TEXT,
      customer_phone TEXT,
      status TEXT
    )
  `
  ).run();

  // Tabla products
  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      category TEXT,
      price REAL,
      is_active INTEGER DEFAULT 1,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `
  ).run();

  // Tabla workshops
  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS workshops (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      rating REAL DEFAULT 0,
      is_recommended INTEGER DEFAULT 0
    )
  `
  ).run();

  return { DB: db };
}
