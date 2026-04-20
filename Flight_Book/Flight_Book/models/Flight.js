import mongoose from "mongoose";

const flightSchema = new mongoose.Schema(
  {
    airline: {
      type: String,
      required: true,
      trim: true,
    },
    source: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    destination: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    departureTime: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Flight = mongoose.model("Flight", flightSchema);

export default Flight;
