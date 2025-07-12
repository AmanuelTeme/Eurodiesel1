// ` import express
const express = require("express");
// ` create web server
const app = express();
// ` import body-parser
const bodyParser = require("body-parser");

// ` import cors
const cors = require("cors");

// ` import dotenv
require("dotenv").config();
// Enable CORS middleware
app.use(cors());

// Enable JSON middleware
app.use(bodyParser.json());

// ` create a port from env file
const port = process.env.PORT || 3001; // Use a configurable port

// ` import routes
const routes = require("./routes/index");
const usedSparePartsRoutes = require("./routes/usedSpareParts.routes");
const path = require("path");
const fs = require("fs");

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Serve uploads statically
app.use("/uploads", express.static(uploadsDir));

// ` Add the routes to the application as middleware
app.use(routes);

// Used Spare Parts API
app.use("/api/used-spare-parts", usedSparePartsRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(` listening on http://localhost:${port}`);
});

// ` export app

module.exports = app;
