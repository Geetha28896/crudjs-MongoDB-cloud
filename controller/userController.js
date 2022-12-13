const users = require("../models/tbl_user");

//get all Products from DBo
exports.getUsers = async (req, res) => {
  try {
    let usersData = await users.find();
    //console.log(usersData);
    res.send(usersData);
  } catch (e) {
    console.log(e.message);
  }
};

exports.createUsers = async function (req, res) {
    try {
      let usersData = await users.create({
        name: req.body.name,
        mob_no: req.body.mob_no,
        email: req.body.email

      });
      res.send(usersData);
    } catch (e) {
      console.log(e.message);
    }
  };