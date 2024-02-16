import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import pg from 'pg';

const app = express();
const port = 3001;

// DB config
const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'busApp',
  password: 'sanjay584',
  port: 5432,
});
db.connect();

var busLocation = {
  latitude: 0,
  longitude: 0,
};

var seatCapacity = 100;

var busList = ['10', '20', '30', '40', '50'];

// CORS
app.use(cors({ origin: true }));
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

// Body Parser middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API endpoints
app.get('/api', (req, res) => {
  res.send('Welcome to WhereIsMyBus');
});

// Location to the Students App
app.get('/api/location', (req, res) => {
  res.json(busLocation);
});

// Crew's location
app.post('/api/location', async (req, res) => {
  try {
    const { locationData } = req.body;
    busLocation = locationData;
    console.log(busLocation);
    // Uncomment and modify the query based on your table structure
    // await db.query("UPDATE busInfo SET latitude = $1, longitude = $2 WHERE bus_number = $3;", [busLocation.latitude, busLocation.longitude, busNumber])
    res.json({ message: 'Location data received successfully' });
  } catch (error) {
    console.error('Error processing location:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Seat Capacity
app.post('/api/seatCapacity', async (req, res) => {
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

app.get('/api/busList', (req, res) => {
  res.send(busList);
});

app.get('/api/seatCapacity', (req, res) => {
  res.json(seatCapacity);
});

app.post('/api/getBusLocation', async (req, res) => {
  const { busNumber, method } = req.body;
  console.log(busNumber);
  if (method == "get"){
    console.log("get");
  } else {
    console.log('post');
  }
});

app.listen(port, () => {
  console.log(`Server listening to port: ${port}`);
});
