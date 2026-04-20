import prisma from "../config/prisma.js";

const run = async () => {
  try {
    const count = await prisma.flight.count();
    console.log(`Total flights: ${count}`);
  } finally {
    await prisma.$disconnect();
  }
};

run();
