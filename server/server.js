import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = 3001;

var busLocation = {
  latitude: 0,
  longitude: 0,
};

var seatCapacity = 100;

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
app.get("/api", (req, res) => {
  res.send("Welcome to WhereIsMyBus");
});

// Location to the Students App
app.get("/api/location", (req, res) => {
  res.json(busLocation);
});

// Crew's location
app.post("/api/location", async (req, res) => {
  try {
    const { locationData } = req.body;
    busLocation = locationData;
    console.log(busLocation);
    res.json({ message: 'Location data received successfully' });
  } catch (error) {
    console.error('Error processing location:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Seat Capacity
app.post("/api/seatCapacity", async (req, res) => {
  try {
    const { percentSeatsFilled } = req.body;
    seatCapacity = 100 - percentSeatsFilled;
    console.log(percentSeatsFilled);
    res.json({ message: 'Seats data received successfully' });
  } catch (error) {
    console.error('Error processing seat capacity:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get("/api/seatCapacity", (req, res) => {
  res.json(seatCapacity);
});

app.listen(port, () => {
  console.log(`Server listening to port: ${port}`);
});
