// const request= require('supertest')
// const server=require('../app')
// require("dotenv").config();
// const tblOrder=require('../models/tbl_orders')
// const tblProduct=require('../models/tbl_products')




// // beforeEach(async()=>{
// //     await tblOrder.deleteMany({})
// // })

// // describe('Order a product POST API/orders',async ()=>{
// //     await request(server).post('/orders')
// //     .send({
// //         productId:'6348ee7eec3a42ecbd510fab',
// //         quantity:3

// //     })
// //     .expect(201)
// // })

// beforeEach(() => {
//     jest.setTimeout(100000);
//     //p = new SUT.PlaywrightFluent();
//   });

// describe('POST API tbl_order',()=>{
//     it('It Should create new order',async ()=>{
//         const res = await request(server).post('/orders').send({
//             productId:'6348ee7eec3a42ecbd510fab',
//             quantity:3
//         });
//         expect(res.statusCode).toEqual(201);

//     })
// })
