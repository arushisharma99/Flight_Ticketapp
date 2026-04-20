import { searchFlights } from "../services/flightService.js";

export const searchFlightsController = async (req, res) => {
  try {
    const { source, destination } = req.query;
    if (
      (source !== undefined && typeof source !== "string") ||
      (destination !== undefined && typeof destination !== "string")
    ) {
      return res.status(400).json({
        message: "source and destination must be strings",
      });
    }

    const flights = await searchFlights({ source, destination });

    return res.status(200).json({
      count: flights.length,
      flights,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to search flights",
      error: error.message,
    });
  }
};
