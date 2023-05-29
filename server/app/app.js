require("dotenv").config();
const express = require("express");
const cors = require("cors");
const DatabaseConnection = require("./db/DatabaseConnection");

const app = express();

app.use(cors());
app.use(express.json());

const connection = new DatabaseConnection();
connection.createConnection();

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
