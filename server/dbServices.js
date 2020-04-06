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
      const dateAdded = new Date();
      const insertId = await new Promise((resolve, reject) => {
        const query =
          "INSERT INTO items (name,qty,amount,date_added) VALUES (?, ?, ?, ?)";
        connection.query(
          query,
          [name, qty, amount, dateAdded],
          (err, result) => {
            if (err) reject(new Error(err.message));
            resolve(result.insertId);
          }
        );
      });
      return {
        id: insertId,
        name: name,
        qty: qty,
        amount: amount,
        dateAdded: dateAdded,
      };
      //return response;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteRowId(id) {
    try {
      id = parseInt(id, 10);
      const response = await new Promise((resolve, reject) => {
        const query = "DELETE FROM items WHERE id = ?";
        connection.query(query, [id], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result.affectedRows);
        });
      });
      return response === 1 ? true : false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async updateRow(id, name, qty, amount) {
    try {
      id = parseInt(id, 10);
      const response = await new Promise((resolve, reject) => {
        const query =
          "UPDATE items SET name = ?, qty = ?, amount = ? WHERE id = ?";
        connection.query(query, [name, qty, amount, id], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result.affectedRows);
        });
      });
      return response === 1 ? true : false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

module.exports = DbServices;
