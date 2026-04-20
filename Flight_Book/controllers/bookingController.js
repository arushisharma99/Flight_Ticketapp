import prisma, { hasDatabaseUrl } from "../config/prisma.js";

export const createBooking = async (req, res) => {
  try {
    if (!hasDatabaseUrl()) {
      return res.status(503).json({ message: "DATABASE_URL is not configured" });
    }

    const { flightId, seats } = req.body;

    if (!flightId || !seats) {
      return res.status(400).json({ message: "flightId and seats are required" });
    }

    if (!Number.isInteger(seats) || seats < 1) {
      return res.status(400).json({ message: "seats must be an integer >= 1" });
    }

    const flight = await prisma.flight.findUnique({
      where: { id: flightId },
    });
    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    const totalPrice = flight.price * seats;

    const booking = await prisma.booking.create({
      data: {
        userId: req.user.id,
        flightId: flight.id,
        seats,
        totalPrice,
        status: "confirmed",
      },
      include: {
        flight: true,
      },
    });

    return res.status(201).json({ booking });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    if (!hasDatabaseUrl()) {
      return res.status(503).json({ message: "DATABASE_URL is not configured" });
    }

    const bookings = await prisma.booking.findMany({
      where: { userId: req.user.id },
      include: { flight: true },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
