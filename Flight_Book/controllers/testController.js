export const getTestMessage = (req, res) => {
  res.status(200).send("API working");
};

export const getHealthStatus = (req, res) => {
  res.status(200).json({
    status: "ok",
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });
};
