import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { LicensePlateSearchSchema, PartsRequestCreateSchema } from "@/shared/types";

const app = new Hono<{ Bindings: Env }>();

// CORS middleware
app.use("*", async (c, next) => {
  await next();
  c.header("Access-Control-Allow-Origin", "*");
  c.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  c.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
});

// Handle preflight requests
app.options("*", (_c) => {
  return new Response(null, { status: 204 });
});

// Vehicle search endpoint (RUNT integration simulation)
app.post("/api/vehicle-search", zValidator("json", LicensePlateSearchSchema), async (c) => {
  const { license_plate } = c.req.valid("json");
  
  try {
    // Simulate RUNT API call - In production, this would call the actual RUNT API
    // For now, we'll simulate with some sample data based on license plate patterns
    
    // Check if vehicle exists in our database first
    const existingVehicle = await c.env.DB.prepare(
      "SELECT * FROM vehicles WHERE license_plate = ? LIMIT 1"
    ).bind(license_plate).first();

    if (existingVehicle) {
      return c.json({ vehicle: existingVehicle });
    }

    // Simulate RUNT response based on license plate format
    let vehicleData: any = {
      license_plate,
      brand: null,
      model: null,
      year: null,
      engine_type: null,
      vehicle_type: null,
    };

    // Simple simulation - in production this would be a real RUNT API call
    if (license_plate.length >= 6) {
      const brands = ["Toyota", "Chevrolet", "Nissan", "Hyundai", "Kia", "Mazda", "Ford", "Volkswagen"];
      const models = ["Corolla", "Aveo", "March", "Accent", "Rio", "Allegro", "Fiesta", "Gol"];
      const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
      const engines = ["1.4L", "1.6L", "1.8L", "2.0L"];
      const types = ["Sedán", "Hatchback", "SUV", "Camioneta"];

      // Use license plate to seed "random" but consistent data
      const plateHash = license_plate.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
      
      vehicleData = {
        license_plate,
        brand: brands[plateHash % brands.length],
        model: models[plateHash % models.length],
        year: years[plateHash % years.length],
        engine_type: engines[plateHash % engines.length],
        vehicle_type: types[plateHash % types.length],
      };

      // Save to database
      await c.env.DB.prepare(`
        INSERT INTO vehicles (license_plate, brand, model, year, engine_type, vehicle_type)
        VALUES (?, ?, ?, ?, ?, ?)
      `).bind(
        vehicleData.license_plate,
        vehicleData.brand,
        vehicleData.model,
        vehicleData.year,
        vehicleData.engine_type,
        vehicleData.vehicle_type
      ).run();
    }

    return c.json({ vehicle: vehicleData });
  } catch (error) {
    console.error("Vehicle search error:", error);
    return c.json({ error: "Error al consultar información del vehículo" }, 500);
  }
});

// Parts request endpoint
app.post("/api/parts-request", zValidator("json", PartsRequestCreateSchema), async (c) => {
  const requestData = c.req.valid("json");
  
  try {
    // Get vehicle info for context
    const vehicle = await c.env.DB.prepare(
      "SELECT * FROM vehicles WHERE license_plate = ? LIMIT 1"
    ).bind(requestData.license_plate).first();

    const vehicleInfo = vehicle ? JSON.stringify(vehicle) : null;

    // Insert parts request
    const result = await c.env.DB.prepare(`
      INSERT INTO parts_requests (license_plate, vehicle_info, part_description, customer_email, customer_phone, status)
      VALUES (?, ?, ?, ?, ?, 'pending')
    `).bind(
      requestData.license_plate,
      vehicleInfo,
      requestData.part_description,
      requestData.customer_email || null,
      requestData.customer_phone || null
    ).run();

    return c.json({ 
      success: true, 
      request_id: result.meta.last_row_id,
      message: "Solicitud enviada correctamente"
    });
  } catch (error) {
    console.error("Parts request error:", error);
    return c.json({ error: "Error al procesar la solicitud" }, 500);
  }
});

// Get products by category
app.get("/api/products", async (c) => {
  const category = c.req.query("category");
  const limit = parseInt(c.req.query("limit") || "20");
  const offset = parseInt(c.req.query("offset") || "0");

  try {
    let query = "SELECT * FROM products WHERE is_active = 1";
    const params: any[] = [];

    if (category) {
      query += " AND category = ?";
      params.push(category);
    }

    query += " ORDER BY created_at DESC LIMIT ? OFFSET ?";
    params.push(limit, offset);

    const products = await c.env.DB.prepare(query).bind(...params).all();

    return c.json({ products: products.results });
  } catch (error) {
    console.error("Products fetch error:", error);
    return c.json({ error: "Error al obtener productos" }, 500);
  }
});

// Get workshops
app.get("/api/workshops", async (c) => {
  const recommended = c.req.query("recommended");

  try {
    let query = "SELECT * FROM workshops";
    const params: any[] = [];

    if (recommended === "true") {
      query += " WHERE is_recommended = 1";
    }

    query += " ORDER BY rating DESC, name ASC";

    const workshops = await c.env.DB.prepare(query).bind(...params).all();

    return c.json({ workshops: workshops.results });
  } catch (error) {
    console.error("Workshops fetch error:", error);
    return c.json({ error: "Error al obtener talleres" }, 500);
  }
});

export default app;
