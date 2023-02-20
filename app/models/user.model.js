const sql = require("../config/db.config.js");

// constructor
const Users = function(users) {
  this.user_id = users.user_id;
  this.fullname = users.fullname;
  this.email = users.email;
  this.password = users.password;
};

Users.create = (newUsers, result) => {
  sql.query("INSERT INTO Users SET ?", newUsers, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUsers });
    result(null, { id: res.insertId, ...newUsers });
  });
};

Users.findById = (id, result) => {
  sql.query(`SELECT * FROM Users WHERE user_id = ${id}`, (err, res) => {
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

    // not found Users with the id
    result({ kind: "not_found" }, null);
  });
};

Users.getAll = (fullname, result) => {
  let query = "SELECT * FROM Users";

  if (user_id) {
    query += ` WHERE name LIKE '%${user_id}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Users: ", res);
    result(null, res);
  });
};

Users.getAllPublished = result => {
  sql.query("SELECT * FROM Users WHERE user_id=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Users: ", res);
    result(null, res);
  });
};

Users.updateById = (id, products, result) => {
  sql.query(
    "UPDATE Users SET fullname = ?, email = ?, password = ? WHERE user_id = ?",
    [users.user_id, users.fullname, users.email, users.password, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Users with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Users: ", { id: id, ...products });
      result(null, { id: id, ...products });
    }
  );
};

Users.remove = (id, result) => {
  sql.query("DELETE FROM Users WHERE user_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Users with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Users with id: ", id);
    result(null, res);
  });
};

Users.removeAll = result => {
  sql.query("DELETE FROM Users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};

module.exports = Users;