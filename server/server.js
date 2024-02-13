import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = 3001;

// CORS
app.use(cors({ origin: true }));
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

// Body Parser middlewares
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// API endpoints
app.post("/api/location", async (req, res) => {
  try {
    const { locationData } = req.body;
    const { latitude, longitude } = locationData;
    console.log(latitude, longitude);
    res.json({ message: 'Location data received successfully' });
  } catch (error) {
    console.error('Error processing location:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, (req, res) => {
  console.log(`Server listening to port: ${port}`);
});
