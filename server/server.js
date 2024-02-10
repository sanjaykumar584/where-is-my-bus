import express from "express";
import cors from "cors"

const app = express()
const port = 3001

// CORS
app.use(cors({origin: true}));
app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

// Body Parser middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API endpoints
app.get("/api", (req, res) => {
    // res.send("Welcome to WhereIsMyBus");
});

app.listen(port, (req, res) => {
    console.log(`Server listening to port: ${port}`)
})