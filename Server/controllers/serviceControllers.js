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
