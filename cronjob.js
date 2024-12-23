import cron from "node-cron";
import https from "https";

const maxRetries = 3;

const pingServer = (retries = 0) => {
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

    if (retries < maxRetries) {
      console.log(`Retrying... Attempt ${retries + 1}`);
      pingServer(retries + 1);
    }
  });

  req.on("error", (err) => {
    console.error("Ping error:", err.message);

    if (retries < maxRetries) {
      console.log(`Retrying... Attempt ${retries + 1}`);
      pingServer(retries + 1);
    }
  });

  req.end();
};

const job = cron.schedule("*/14 * * * *", () => {
  console.log("Pinging server to keep it alive...");
  pingServer();
});

export default job;
