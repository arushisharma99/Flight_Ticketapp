import prisma, { hasDatabaseUrl } from "./prisma.js";

const connectDB = async () => {
  if (!hasDatabaseUrl()) {
    console.warn("DATABASE_URL is not set. Skipping PostgreSQL connection.");
    return;
  }

  try {
    await prisma.$connect();
    console.log("PostgreSQL connected");
  } catch (error) {
    console.error(`PostgreSQL connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
