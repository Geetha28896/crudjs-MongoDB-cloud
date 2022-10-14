const express = require("express");
const productController = require("./controller/productController");
const orderController = require("./controller/orderController");
require("dotenv").config();

//Database connection
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

const app = express();
app.use(express.json());

const port = process.env.port || 8080;

app.get("/products", productController.getProducts);
app.get("/products/:id", productController.getProductById);
app.post("/products", productController.createProducts);
app.put("/modify/product/:id", productController.modifyProduct);
app.patch("/update/product/:id", productController.updateProduct);
app.delete("/delete/product/:id", productController.deleteProduct);


app.get("/orders", orderController.getOrders);
app.post("/orders", orderController.createOrders);
app.get("/orders/:id", orderController.getOrdersByID);
app.get("/orders/users/:id", orderController.allUserDetails);
app.delete("/orders/:id", orderController.deleteOrder);

module.exports = app;

app.listen(port, () => {
    console.log("Listening port!" + port);
  });


