const Products = require("../models/product.model.js");

exports.create = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    const products = new Products({
      car_id: req.body.car_id,
      name: req.body.name,
      description: req.body.description,
      colour: req.body.colour,
      price: req.body.price || false
    });

    Products.create(products, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the product."
        });
      else res.send(data);
    });
  };

  exports.findAll = (req, res) => {
    const car_id = req.query.car_id;
  
    Products.getAll(car_id, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving product."
        });
      else res.send(data);
    });
  };
  
  exports.findAllPublished = (req, res) => {
    Products.getAllPublished((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving product."
        });
      else res.send(data);
    });
  };

  exports.findOne = (req, res) => {
    Products.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found product with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving product with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };

  exports.update = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    console.log(req.body);
  
    Products.updateById(
      req.params.id,
      new Products(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found product with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating product with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
  };

  exports.delete = (req, res) => {
    Products.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found product with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete product with id " + req.params.id
          });
        }
      } else res.send({ message: `Product was deleted successfully!` });
    });
  };

  exports.deleteAll = (req, res) => {
    Products.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all products."
        });
      else res.send({ message: `All Users were deleted successfully!` });
    });
  };