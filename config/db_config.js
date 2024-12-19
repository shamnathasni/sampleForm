import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

const dbURI = process.env.MONGODB_URI;

// Connect to MongoDB using Mongoose
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Error connecting to MongoDB:", error));

   export default mongoose