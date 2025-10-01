import z from "zod";

// Vehicle schemas
export const VehicleSchema = z.object({
  id: z.number(),
  license_plate: z.string(),
  brand: z.string().nullable(),
  model: z.string().nullable(),
  year: z.number().nullable(),
  engine_type: z.string().nullable(),
  vehicle_type: z.string().nullable(),
  chassis_number: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Vehicle = z.infer<typeof VehicleSchema>;

// Product schemas
export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  category: z.string(),
  subcategory: z.string().nullable(),
  price: z.number().nullable(),
  image_url: z.string().nullable(),
  stock_quantity: z.number().default(0),
  is_active: z.boolean().default(true),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Product = z.infer<typeof ProductSchema>;

// Parts request schemas
export const PartsRequestSchema = z.object({
  id: z.number(),
  license_plate: z.string(),
  vehicle_info: z.string().nullable(),
  part_description: z.string().nullable(),
  customer_email: z.string().nullable(),
  customer_phone: z.string().nullable(),
  status: z.string().default('pending'),
  created_at: z.string(),
  updated_at: z.string(),
});

export type PartsRequest = z.infer<typeof PartsRequestSchema>;

// Workshop schemas
export const WorkshopSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  address: z.string().nullable(),
  phone: z.string().nullable(),
  email: z.string().nullable(),
  website: z.string().nullable(),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
  rating: z.number().default(0),
  is_recommended: z.boolean().default(false),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Workshop = z.infer<typeof WorkshopSchema>;

// API request schemas
export const LicensePlateSearchSchema = z.object({
  license_plate: z.string().min(6).max(8),
});

export const PartsRequestCreateSchema = z.object({
  license_plate: z.string().min(6).max(8),
  part_description: z.string().min(1),
  customer_email: z.string().email().optional(),
  customer_phone: z.string().optional(),
});
