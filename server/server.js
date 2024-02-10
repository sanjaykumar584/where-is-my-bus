import express from "express";
import cors from "cors"

const app = express()
const port = 3001

app.use(cors({origin: true}));
app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

app.get("/api", (req, res) => {
    // res.send("Welcome to WhereIsMyBus");
});

app.listen(port, (req, res) => {
    console.log(`Server listening to port: ${port}`)
})