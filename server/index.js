const { v4: uuidv4 } = require('uuid');

// Create express app
const express = require("express")
const app = express()
const db = require("./database.js")
const cors = require('cors')

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

 // enable cors to the server
 const corsOpt = {
    origin: process.env.CORS_ALLOW_ORIGIN || '*', // this work well to configure origin url in the server
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'], // to works well with web app, OPTIONS is required
    allowedHeaders: ['Content-Type', 'Authorization'] // allow json and token in the headers
};
app.use(cors(corsOpt)); // cors for all the routes of the application
app.options('*', cors(corsOpt)); // automatic cors gen for HTTP verbs in all routes, This can be redundant but I kept to be sure that will always work.


// Server port
const HTTP_PORT = 8000

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});

// Root endpoint
app.get("/", (req, res, next) => {
    res.json({ "message": "Ok" })
});

// Insert here other API endpoints
app.get("/api/game", (req, res, next) => {
    const sql = "select * from games"
    const params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        
        res.json({
            "message": "success",
            "data": rows
        })
    });
});

app.get("/api/game/:uuid", (req, res, next) => {
    const sql = "select * from games where uuid = ?"
    const params = [req.params.uuid];

    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }

        if (!row) {
            res.status(404).json({ "error":  "No game found with UUID" });
            return;
        }

        res.json({
            "message": "success",
            "data": row
        })
    });
});

app.post("/api/game/", (req, res, next) => {
    const errors=[]
    if (!req.body.numPlayers){
        errors.push("Number of players not specified");
    }

    if (errors.length) {
        res.status(400).json({"error":errors.join(",")});
        return;
    }

    let uuid = uuidv4(); 
    uuid = uuid.substring(0,8);

    const data = {
        uuid: uuid,
        numPlayers: req.body.numPlayers
    }

    const sql ='INSERT INTO games (uuid, num_players) VALUES (?,?)'
    const params =[data.uuid, data.numPlayers];
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.status(201).json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
})

// Default response for any other request
app.use(function (req, res) {
    res.status(404);
});