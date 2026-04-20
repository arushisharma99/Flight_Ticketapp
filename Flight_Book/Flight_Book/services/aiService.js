import OpenAI from "openai";
import { searchFlights } from "./flightService.js";

const cityPattern = /from\s+([a-zA-Z\s]+?)\s+to\s+([a-zA-Z\s]+)/i;

const normalizeCity = (city) => String(city || "").trim().toLowerCase();

const formatFlight = (flight) => ({
  airline: flight.airline,
  source: flight.source,
  destination: flight.destination,
  price: flight.price,
  departureTime: flight.departureTime,
});

const findCheapestFlight = async (message) => {
  const match = message.match(cityPattern);
  if (!match) return null;

  const source = normalizeCity(match[1]);
  const destination = normalizeCity(match[2]);
  const flights = await searchFlights({ source, destination });

  if (flights.length === 0) {
    return {
      intent: "find_cheapest_flight",
      source,
      destination,
      count: 0,
      cheapestFlight: null,
      message: `No flights found from ${source} to ${destination}.`,
    };
  }

  const cheapestFlight = flights.reduce((min, current) =>
    current.price < min.price ? current : min
  );

  return {
    intent: "find_cheapest_flight",
    source,
    destination,
    count: flights.length,
    cheapestFlight: formatFlight(cheapestFlight),
    message: `Cheapest flight from ${source} to ${destination} found.`,
  };
};

const getOpenAIResponse = async (message) => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return {
      intent: "general_chat",
      message: "OPENAI_API_KEY is not configured.",
      response: "Please set OPENAI_API_KEY in your environment to enable AI chat.",
    };
  }

  const openai = new OpenAI({ apiKey });

  const completion = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a travel assistant API. Return concise responses suitable for JSON fields.",
      },
      { role: "user", content: message },
    ],
    temperature: 0.2,
  });

  return {
    intent: "general_chat",
    message: "AI response generated successfully.",
    response: completion.choices[0]?.message?.content || "",
  };
};

export const handleAIChat = async (message) => {
  const cheapestFlightResult = await findCheapestFlight(message);
  if (cheapestFlightResult) {
    return cheapestFlightResult;
  }

  return getOpenAIResponse(message);
};
