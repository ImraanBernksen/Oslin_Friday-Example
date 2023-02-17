const sql = require("./db.js");

// constructor
const Products = function(products) {
  this.car_id = products.car_id;
  this.name = products.name;
  this.description = products.description;
  this.colour = products.colour;
  this.price = products.price;
};

Products.create = (newProducts, result) => {
  sql.query("INSERT INTO Products SET ?", newProducts, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created product: ", { id: res.insertId, ...newProducts });
    result(null, { id: res.insertId, ...newProducts });
  });
};

Products.findById = (id, result) => {
  sql.query(`SELECT * FROM Products WHERE car_id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Products with the id
    result({ kind: "not_found" }, null);
  });
};

Products.getAll = (name, result) => {
  let query = "SELECT * FROM Products";

  if (name) {
    query += ` WHERE name LIKE '%${name}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Products: ", res);
    result(null, res);
  });
};

Products.getAllPublished = result => {
  sql.query("SELECT * FROM Products WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Products: ", res);
    result(null, res);
  });
};

Products.updateById = (id, products, result) => {
  sql.query(
    "UPDATE Products SET name = ?, description = ?, colour = ?, price = ? WHERE car_id = ?",
    [products.name, products.description, products.colour, products.price, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Products with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Products: ", { id: id, ...products });
      result(null, { id: id, ...products });
    }
  );
};

Products.remove = (id, result) => {
  sql.query("DELETE FROM Products WHERE car_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Products with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Products with id: ", id);
    result(null, res);
  });
};

Products.removeAll = result => {
  sql.query("DELETE FROM Products", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} products`);
    result(null, res);
  });
};

module.exports = Products;