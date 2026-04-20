import prisma, { hasDatabaseUrl } from "../config/prisma.js";

const dummyFlights = [
  {
    airline: "SkyJet",
    source: "delhi",
    destination: "mumbai",
    price: 5200,
    departureTime: "2026-05-01T06:30:00.000Z",
  },
  {
    airline: "AirNova",
    source: "delhi",
    destination: "bengaluru",
    price: 6400,
    departureTime: "2026-05-01T09:00:00.000Z",
  },
  {
    airline: "CloudAir",
    source: "mumbai",
    destination: "delhi",
    price: 5000,
    departureTime: "2026-05-01T12:45:00.000Z",
  },
  {
    airline: "IndiSky",
    source: "chennai",
    destination: "hyderabad",
    price: 4100,
    departureTime: "2026-05-02T08:15:00.000Z",
  },
  {
    airline: "StarWings",
    source: "delhi",
    destination: "mumbai",
    price: 5600,
    departureTime: "2026-05-02T16:20:00.000Z",
  },
];

let isSeeded = false;

const normalize = (value) => String(value || "").trim().toLowerCase();

const buildFallbackFilter = (source, destination) => {
  const filter = {};
  if (source) filter.source = normalize(source);
  if (destination) filter.destination = normalize(destination);
  return filter;
};

const buildPrismaFilter = (source, destination) => {
  const sourceValue = String(source || "").trim();
  const destinationValue = String(destination || "").trim();
  const where = {};

  if (sourceValue) {
    where.source = { equals: sourceValue, mode: "insensitive" };
  }

  if (destinationValue) {
    where.destination = { equals: destinationValue, mode: "insensitive" };
  }

  return where;
};

const seedFlightsIfNeeded = async () => {
  if (!hasDatabaseUrl() || isSeeded) return;

  const count = await prisma.flight.count();
  if (count === 0) {
    await prisma.flight.createMany({
      data: dummyFlights.map((flight) => ({
        ...flight,
        departureTime: new Date(flight.departureTime),
      })),
    });
  }

  isSeeded = true;
};

export const searchFlights = async ({ source, destination }) => {
  const fallbackFilter = buildFallbackFilter(source, destination);
  const prismaFilter = buildPrismaFilter(source, destination);

  if (hasDatabaseUrl()) {
    try {
      await seedFlightsIfNeeded();
      return await prisma.flight.findMany({
        where: prismaFilter,
        orderBy: { departureTime: "asc" },
      });
    } catch (error) {
      console.warn(`Flight DB query failed, using dummy data: ${error.message}`);
    }
  }

  return dummyFlights
    .filter((flight) => (!fallbackFilter.source || flight.source === fallbackFilter.source))
    .filter(
      (flight) =>
        !fallbackFilter.destination || flight.destination === fallbackFilter.destination
    )
    .sort((a, b) => new Date(a.departureTime) - new Date(b.departureTime));
};
