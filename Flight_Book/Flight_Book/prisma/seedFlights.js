import prisma from "../config/prisma.js";

const flights = [
  { airline: "Indigo", source: "delhi", destination: "mumbai", price: 5200, departureTime: new Date("2026-04-20T02:30:00.000Z") },
  { airline: "Air India", source: "delhi", destination: "bangalore", price: 6900, departureTime: new Date("2026-04-20T05:45:00.000Z") },
  { airline: "Vistara", source: "delhi", destination: "chennai", price: 7600, departureTime: new Date("2026-04-20T11:10:00.000Z") },
  { airline: "Indigo", source: "mumbai", destination: "delhi", price: 5400, departureTime: new Date("2026-04-21T03:20:00.000Z") },
  { airline: "Air India", source: "mumbai", destination: "bangalore", price: 4800, departureTime: new Date("2026-04-21T07:05:00.000Z") },
  { airline: "Vistara", source: "mumbai", destination: "chennai", price: 6100, departureTime: new Date("2026-04-21T14:30:00.000Z") },
  { airline: "Indigo", source: "bangalore", destination: "delhi", price: 6500, departureTime: new Date("2026-04-22T01:50:00.000Z") },
  { airline: "Air India", source: "bangalore", destination: "mumbai", price: 4300, departureTime: new Date("2026-04-22T06:25:00.000Z") },
  { airline: "Vistara", source: "bangalore", destination: "chennai", price: 3200, departureTime: new Date("2026-04-22T12:00:00.000Z") },
  { airline: "Indigo", source: "chennai", destination: "delhi", price: 8100, departureTime: new Date("2026-04-23T04:40:00.000Z") },
  { airline: "Air India", source: "chennai", destination: "mumbai", price: 5900, departureTime: new Date("2026-04-23T09:15:00.000Z") },
  { airline: "Vistara", source: "chennai", destination: "bangalore", price: 3400, departureTime: new Date("2026-04-23T13:55:00.000Z") },
  { airline: "Indigo", source: "delhi", destination: "mumbai", price: 4700, departureTime: new Date("2026-04-24T15:35:00.000Z") },
  { airline: "Air India", source: "mumbai", destination: "delhi", price: 5600, departureTime: new Date("2026-04-24T17:50:00.000Z") },
  { airline: "Vistara", source: "bangalore", destination: "delhi", price: 7300, departureTime: new Date("2026-04-24T19:20:00.000Z") },
];

const run = async () => {
  try {
    const result = await prisma.flight.createMany({ data: flights });
    console.log(`Inserted ${result.count} flights.`);
  } catch (error) {
    console.error("Failed to seed flights:", error.message);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
};

run();
