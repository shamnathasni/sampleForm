import cron from "node-cron";
import https from "https";

const job = cron.schedule("*/14 * * * *", () => {
  console.log("Pinging server to keep it alive...");

  const options = {
    hostname: "swoz.onrender.com",
    method: "GET",
    timeout: 60000, // Timeout set to 60 seconds
  };

  const req = https.request(options, (res) => {
    console.log(`Ping response: ${res.statusCode}`);
  });

  req.on("timeout", () => {
    req.abort();
    console.error("Request timed out");
  });

  req.on("error", (err) => {
    console.error("Ping error:", err.message);
  });

  req.end();
});

export default job;
