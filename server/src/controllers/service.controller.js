import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Service } from "../models/service.model.js";

/* ================= CREATE ================= */
const createService = asyncHandler(async (req, res) => {
  const { name, description, price, durationInMinutes } = req.body;

  if (!name || !price || !durationInMinutes) {
    throw new ApiError(400, "All required fields must be provided");
  }

  const service = await Service.create({
    name,
    description,
    price,
    durationInMinutes,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, service, "Service created"));
});

/* ================= GET ALL ================= */
const getAllServices = asyncHandler(async (req, res) => {
  let services = await Service.find();

  // ✅ AUTO INSERT DEFAULT SERVICES IF EMPTY
  if (services.length === 0) {
    const defaultServices = [
      {
        name: "General Checkup",
        description: "Basic health checkup with doctor consultation",
        price: 200,
        durationInMinutes: 20,
      },
      {
        name: "Blood Test",
        description: "Complete blood test package",
        price: 500,
        durationInMinutes: 15,
      },
      {
        name: "X-Ray",
        description: "Digital X-Ray imaging service",
        price: 800,
        durationInMinutes: 25,
      },
      {
  name: "MRI Scan",
  description: "Magnetic Resonance Imaging for detailed internal body scan",
  price: 3500,
  durationInMinutes: 45,
},
{
  name: "CT Scan",
  description: "Computed Tomography scan for detailed cross-sectional images",
  price: 2500,
  durationInMinutes: 30,
},
{
  name: "ECG Test",
  description: "Electrocardiogram test to monitor heart activity",
  price: 300,
  durationInMinutes: 10,
},
{
  name: "Ultrasound",
  description: "Ultrasound imaging for abdomen and pregnancy checkups",
  price: 1000,
  durationInMinutes: 20,
},
{
  name: "Thyroid Test",
  description: "Blood test to check thyroid hormone levels",
  price: 400,
  durationInMinutes: 15,
},
{
  name: "Full Body Checkup",
  description: "Comprehensive health checkup including multiple tests",
  price: 2000,
  durationInMinutes: 60,
}
    ];

    await Service.insertMany(defaultServices);

    // fetch again after insert
    services = await Service.find();
  }

  return res
    .status(200)
    .json(new ApiResponse(200, services, "Fetched"));
});

/* ================= DELETE ================= */
const deleteService = asyncHandler(async (req, res) => {
  const { serviceId } = req.params;

  await Service.findByIdAndDelete(serviceId);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Service deleted"));
});

export { createService, getAllServices, deleteService };