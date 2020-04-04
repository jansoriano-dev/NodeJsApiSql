const mysql = require("mysql");
const dotenv = require("dotenv");
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
});

connection.connect((err) => {
  if (err) {
    console.log(err.message);
  }
  //console.log("db" + connection.state);
});

class DbServices {
  static getDbServicesInstance() {
    return instance ? instance : new DbServices();
  }

  async getAllData() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM items";
        connection.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async insetNewItem(name, qty, amount) {
    try {
      const insertId = await new Promise((resolve, reject) => {
        const query = "INSERT INTO items (name,qty,amount) VALUES (?, ?, ?)";
        connection.query(query, [name, qty, amount], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result.insertId);
        });
      });
      return {
        id: insertId,
        name: name,
        qty: qty,
        amount: amount,
      };
      //return response;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = DbServices;
