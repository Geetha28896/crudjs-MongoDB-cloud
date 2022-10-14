const orders = require("../models/tbl_orders");
const products = require("../models/tbl_products");

const timestamp = require("time-stamp");
const mongoose = require("mongoose");

//get all ordersDetails
exports.getOrders = async function (req, res) {
  try {
    let order = await orders.find();
    //console.log(typeof products);
    res.send(order);
  } catch (e) {
    console.log(e.message);
  }
};

//getById from orders
exports.getOrdersByID = async function (req, res) {
  try {
    let order = await orders.findById(req.params.id);
    if(order._id==req.params.id){
      res.send(order);
    }
    
  } catch (e) {
    console.log(e.message);
    res.send("Order Id not exist")

  }
};

//create orders
exports.createOrders = async function (req, res) {
  try {
    let order = await orders.find();
    //console.log(typeof products);
    const sortByDate = (order) => {
      const sorter = (a, b) => {
        return (
          new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime()
        );
      };
      order.sort(sorter);
    };
    sortByDate(order);
    //console.log(order[0])

    let orderData = await orders.create({
      userId: order[0].userId + 1,
      productId: req.body.productId,
      quantity: req.body.quantity,
      timeStamp: timestamp.utc("YYYY/MM/DD:HH:mm:ss"),
      orderPrice: Number.parseFloat(
        (await products.findById(req.body.productId)).price * req.body.quantity
      ),
    });

    let totProdQuantity = (await products.findById(orderData.productId))
      .available_quantity;
    if (totProdQuantity >= orderData.quantity) {
      let replacement = totProdQuantity - orderData.quantity;

      console.log(replacement);

      console.log(orderData.productId);

      const filter = { _id: `${req.body.productId}` };
      const update = { available_quantity: `${replacement}` };

      let doc = await products.findOneAndUpdate(filter, update, {
        new: true,
      });

      // console.log(filter)
      // console.log(update)
      await doc.save();

      res.send(orderData);
    } else {
      res.status(403).send({
        msg:
          "Sorry!! Minimum Order Quantity Only Available Here /n Available Quantity : " +
          totProdQuantity,
      });
    }
  } catch (e) {
    console.log(e.message);
  }
};

exports.allUserDetails = async function (req, res, next) {
  try {
    orders
      .findById(req.params.id)
      .populate("productId", "product_name")
      .exec()
      .then((order) => {
        if (!order) {
          return res.status(404).json({
            message: "Order not found",
          });
        }
        res.status(200).json({
          order: order,
          request: {
            type: "GET",
            url: "http://localhost:8080/orders",
          },
        });
      });
  } catch (e) {
    console.log(e.message);
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    await orders.findOneAndRemove(
      { _id: req.params.id },
      function (err, offer) {
        if (!err) {
          res.send("Order deleted successfully!");
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
