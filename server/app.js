const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const dbServices = require("./dbServices");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//read
app.get("/getAll", (request, response) => {
  const db = dbServices.getDbServicesInstance();
  const result = db.getAllData();

  result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
});
//create
app.post("/insert", (request, response) => {});

//update

//delete

app.listen(process.env.PORT, () => console.log("app is running"));
