const products = require("../models/tbl_products");

//get all Products from DBo
exports.getProducts = async (req, res) => {
  try {
    let productData = await products.find();
    console.log(productData);
    res.send(productData);
  } catch (e) {
    console.log(e.message);
  }
};

//get the particular product based on the Id
exports.getProductById = async (req, res) => {
  try {
    //let id=req.params.id;
    const prod = await products.findById(req.params.id);
    if (prod._id == req.params.id) {
      res.send(prod);
    }
  } catch (e) {
    console.log(e.message);
    res.send("Product Id not exist");
  }
};

//create products
exports.createProducts = async function (req, res) {
  try {
    let productData = await products.create({
      product_name: req.body.product_name,
      price: req.body.price,
      available_quantity: req.body.available_quantity,
      description: req.body.description,
      offers: req.body.offers,
    });
    res.send(productData);
  } catch (e) {
    console.log(e.message);
  }
};

//modify the document based on the Id
exports.modifyProduct = async (req, res) => {
  try {
    let data = await products.updateOne(req.params, { $set: req.body });
    res.send(data);
  } catch (e) {
    res.send("You cannot Modify this document");
  }
};

//update or modify the product details based on the id

exports.updateProduct = async (req, res) => {
  try {
    const product = await products.findById(req.params.id);
    product.price = req.body.price;
    const result = await product.save();
    res.send(result);
  } catch (e) {
    res.send("You cannot change the Product details");
  }
};

//delete Product based on the Id
exports.deleteProduct = async (req, res) => {
  try {
    await products.findOneAndRemove(
      { _id: req.params.id },
      function (err, offer) {
        if (!err) {
          console.log(offer);
          res.send("product deleted successfully!");
        } else {
          res.send.json({
            message: "Cant't delete this Id",
          });
        }
      }
    );
  } catch (e) {
    console.log(e.message);
  }
};
