const maxRetries = 6;
const pingServer = (retries = 0) => {
  const options = {
    hostname: "swoz.onrender.com",
    method: "GET",
    timeout: 120000, // Timeout set to 120 seconds
  };

  const req = https.request(options, (res) => {
    console.log(`Ping response: ${res.statusCode}`);
  });

  req.on("timeout", () => {
    req.abort();
    console.error("Request timed out");

    if (retries < maxRetries) {
      console.log(`Retrying... Attempt ${retries + 1}`);
      setTimeout(() => pingServer(retries + 1), 1000 * (retries + 1)); // Exponential backoff
    } else {
      console.log("Max retries reached. No further attempts.");
    }
  });

  req.on("error", (err) => {
    console.error("Ping error:", err.message);

    if (retries < maxRetries) {
      console.log(`Retrying... Attempt ${retries + 1}`);
      setTimeout(() => pingServer(retries + 1), 1000 * (retries + 1)); // Exponential backoff
    } else {
      console.log("Max retries reached. No further attempts.");
    }
  });

  req.end();
};

// Pinging every 5 minutes to ensure the server stays alive
setInterval(() => {
  console.log("Pinging server to keep it alive...");
  pingServer();
}, 5 * 60 * 1000); // Every 5 minutes
