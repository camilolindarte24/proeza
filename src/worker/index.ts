// src/app.ts
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import {
  LicensePlateSearchSchema,
  PartsRequestCreateSchema,
} from "@/shared/types";
import { Env, initDB } from "@/env";

// Inicializa la DB real
const env = initDB();

const app = new Hono<{ Bindings: Env }>();

// Middleware para inyectar DB en c.env
app.use("*", (c, next) => {
  c.env = env; // c.env.DB ahora está disponible
  return next();
});

// CORS middleware
app.use("*", async (c, next) => {
  await next();
  c.header("Access-Control-Allow-Origin", "*");
  c.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  c.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
});

// Preflight requests
app.options("*", (_c) => new Response(null, { status: 204 }));

// ================== Endpoints ==================

// Vehicle search
app.post(
  "/api/vehicle-search",
  zValidator("json", LicensePlateSearchSchema),
  async (c) => {
    const { license_plate } = c.req.valid("json");

    // Buscar en DB real
    const existingVehicle = c.env.DB.prepare(
      "SELECT * FROM vehicles WHERE license_plate = ?"
    ).get(license_plate);

    if (existingVehicle) return c.json({ vehicle: existingVehicle });

    // Generar datos simulados
    const brands = [
      "Toyota",
      "Chevrolet",
      "Nissan",
      "Hyundai",
      "Kia",
      "Mazda",
      "Ford",
      "Volkswagen",
    ];
    const models = [
      "Corolla",
      "Aveo",
      "March",
      "Accent",
      "Rio",
      "Allegro",
      "Fiesta",
      "Gol",
    ];
    const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
    const engines = ["1.4L", "1.6L", "1.8L", "2.0L"];
    const types = ["Sedán", "Hatchback", "SUV", "Camioneta"];
    const plateHash = license_plate
      .split("")
      .reduce((a, b) => a + b.charCodeAt(0), 0);

    const vehicleData = {
      license_plate,
      brand: brands[plateHash % brands.length],
      model: models[plateHash % models.length],
      year: years[plateHash % years.length],
      engine_type: engines[plateHash % engines.length],
      vehicle_type: types[plateHash % types.length],
    };

    // Guardar en DB
    c.env.DB.prepare(
      `
      INSERT INTO vehicles (license_plate, brand, model, year, engine_type, vehicle_type)
      VALUES (?, ?, ?, ?, ?, ?)
    `
    ).run(
      vehicleData.license_plate,
      vehicleData.brand,
      vehicleData.model,
      vehicleData.year,
      vehicleData.engine_type,
      vehicleData.vehicle_type
    );

    return c.json({ vehicle: vehicleData });
  }
);

// Parts request
app.post(
  "/api/parts-request",
  zValidator("json", PartsRequestCreateSchema),
  async (c) => {
    const requestData = c.req.valid("json");

    // Obtener info del vehículo
    const vehicle = c.env.DB.prepare(
      "SELECT * FROM vehicles WHERE license_plate = ?"
    ).get(requestData.license_plate);

    const vehicleInfo = vehicle ? JSON.stringify(vehicle) : null;

    // Insertar solicitud
    const result = c.env.DB.prepare(
      `
      INSERT INTO parts_requests 
      (license_plate, vehicle_info, part_description, customer_email, customer_phone, status)
      VALUES (?, ?, ?, ?, ?, 'pending')
    `
    ).run(
      requestData.license_plate,
      vehicleInfo,
      requestData.part_description,
      requestData.customer_email || null,
      requestData.customer_phone || null
    );

    return c.json({
      success: true,
      request_id: result.lastInsertRowid,
      message: "Solicitud enviada correctamente",
    });
  }
);

// Get products
app.get("/api/products", async (c) => {
  const category = c.req.query("category");
  const limit = parseInt(c.req.query("limit") || "20");
  const offset = parseInt(c.req.query("offset") || "0");

  let query = "SELECT * FROM products WHERE is_active = 1";
  const params: any[] = [];

  if (category) {
    query += " AND category = ?";
    params.push(category);
  }

  query += " ORDER BY created_at DESC LIMIT ? OFFSET ?";
  params.push(limit, offset);

  const products = c.env.DB.prepare(query).all(...params);
  return c.json({ products });
});

// Get workshops
app.get("/api/workshops", async (c) => {
  const recommended = c.req.query("recommended");

  let query = "SELECT * FROM workshops";
  const params: any[] = [];

  if (recommended === "true") {
    query += " WHERE is_recommended = 1";
  }

  query += " ORDER BY rating DESC, name ASC";

  const workshops = c.env.DB.prepare(query).all(...params);
  return c.json({ workshops });
});

export default app;
