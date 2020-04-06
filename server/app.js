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
app.post("/insert", (request, response) => {
  const { name, qty, amount } = request.body;
  const db = dbServices.getDbServicesInstance();
  const result = db.insetNewItem(name, qty, amount);
  result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
});

//update
app.patch("/update", (request, response) => {
  const { id, name, qty, amount } = request.body;
  const db = dbServices.getDbServicesInstance();

  const result = db.updateRow(id, name, qty, amount);

  result
    .then((data) => response.json({ success: data }))
    .catch((err) => console.log(err));
});

//delete
app.delete("/delete/:id", (request, response) => {
  const { id } = request.params;
  const db = dbServices.getDbServicesInstance();

  const result = db.deleteRowId(id);

  result
    .then((data) => response.json({ success: data }))
    .catch((err) => console.log(err));
});

app.listen(process.env.PORT, () => console.log("app is running"));
