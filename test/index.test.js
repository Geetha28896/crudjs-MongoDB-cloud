const request = require("supertest");
const server = require("../app");

beforeEach(() => {
  jest.useFakeTimers();
});

/**
 * GET APIS FOR tbl_product
 */
describe("GET /Products", function () {
  test("Get all products from test database", function (done) {
    request(server).get("/products").expect(200).end();
    done();
  });

  test("Its not get all products from test database", function (done) {
    request(server).get("/product").expect(404).end();
    done();
  });
});

/**
 * GET APIS FOR tbl_product
 */
describe("GET/orders", () => {
  test("Get all orders from test database", function (done) {
    request(server).get("/orders").expect(200).end();
    done();
  });
  test("Its not get all orders from test database", function (done) {
    request(server).get("/order").expect(404).end();
    done();
  });
});

/**
 * POST product details
 */

describe("POST API FOR tbl_product", () => {
  test("It should create a new Product",  (done) => {
     request(server)
      .post("/products")
      .send({
        product_name: "car",
        price: 20000,
        available_quantity: 50,
        description: "RedMi 9 prime, color-grey, Ram-64Gb ",
        offers: [
          "First User Offers: 20%",
          "Sunday Offers: 10%",
          "Great Indian Festival Sale Offers 50%"
        ]
      })
      .expect(200)
      .end()
      done()
  });
});
