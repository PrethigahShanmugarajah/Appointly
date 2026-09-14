// Server / controllers / serviceControllers.js
import Service from "../models/Service.js";

/* -------- List Services -------- */
export const listServices = async (req, res) => {
  try {
    // const services = (
    //   await Service.find({
    //     userId: req.user.id,
    //     isDeleted: { $ne: true },
    //   })
    // ).toSorted({ createdAt: -1 });

    const services = await Service.find({
      userId: req.user.id,
      isDeleted: { $ne: true },
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message:
        services.length === 0
          ? "No services found."
          : services.length === 1
            ? "Service retrieved successfully."
            : "Services retrieved successfully.",
      services,
    });
  } catch (error) {
    console.error(
      "List Services Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while retrieving the services.",
      error: `List Services Error: ${error?.stack || error?.message || error}`,
    });
  }
};

/* -------- Create Service -------- */
export const createService = async (req, res) => {
  try {
    const { name, duration, price, description, icon } = req.body;

    // if (!name || !duration) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Service name and duration are required.",
    //   });
    // }

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Service name is required.",
      });
    }

    if (!duration) {
      return res.status(400).json({
        success: false,
        message: "Service duration is required.",
      });
    }

    const service = await Service.create({
      userId: req.user.id,
      name,
      duration,
      price: price || 0,
      description: description || "",
      icon: icon || "C1.png",
    });

    return res.status(201).json({
      success: true,
      message: "Service created successfully.",
      service,
    });
  } catch (error) {
    console.error(
      "Create Service Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while creating the service.",
      error: `Create Service Error: ${error?.stack || error?.message || error}`,
    });
  }
};

/* -------- Update Service -------- */
export const updateService = async (req, res) => {
  try {
    const updates = {};
    const allowedFields = [
      "name",
      "duration",
      "price",
      "description",
      "isActive",
      "icon",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const service = await Service.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id, isDeleted: { $ne: true } },
      updates,
      { new: true },
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Service updated successfully.",
      service,
    });
  } catch (error) {
    console.error(
      "Update Service Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while updating the service.",
      error: `Update Service Error: ${error?.stack || error?.message || error}`,
    });
  }
};

/* -------- Delete Service -------- */
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id, isDeleted: { $ne: true } },
      { isDeleted: true, isActive: false },
      { new: true },
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Service deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Delete Services Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while deleting the service.",
      error: `Delete Services Error: ${error?.stack || error?.message || error}`,
    });
  }
};
