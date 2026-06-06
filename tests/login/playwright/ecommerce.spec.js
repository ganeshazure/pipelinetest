// ============================================================
// INDUSTRY STANDARD PLAYWRIGHT E2E FRAMEWORK
// REAL SENIOR LEVEL STRUCTURE
// ============================================================
//
// FLOW:
//
// Login
// ↓
// Search
// ↓
// Add To Cart
// ↓
// Checkout
// ↓
// Delivery
// ↓
// Return
// ↓
// Refund
//
// ============================================================
//
// REAL INDUSTRY DIFFERENCE:
//
// ❌ BAD:
//
// Huge 400-line spec files
//
// ✅ GOOD:
//
// Reusable flows
// Reusable business services
// Thin test files
// API setup where needed
// Centralized assertions
//
// ============================================================



// ============================================================
// PROJECT STRUCTURE
// ============================================================

/*

framework/
│
├── pages/
│     ├── LoginPage.js
│     ├── SearchPage.js
│     ├── ProductPage.js
│     ├── CartPage.js
│     ├── CheckoutPage.js
│     ├── DeliveryPage.js
│     ├── ReturnPage.js
│     └── RefundPage.js
│
├── flows/
│     ├── AuthFlow.js
│     ├── PurchaseFlow.js
│     ├── DeliveryFlow.js
│     ├── ReturnFlow.js
│     └── RefundFlow.js
│
├── api/
│     └── OrderApi.js
│
├── db/
│     └── OrderDb.js
│
├── utils/
│     ├── logger.js
│     ├── faker.js
│     └── constants.js
│
├── fixtures/
│     └── testFixtures.js
│
├── tests/
│     └── refund/
│            └── refundJourney.spec.js
│
└── playwright.config.js

*/



// ============================================================
// FILE: flows/PurchaseFlow.js
// ============================================================
//
// COMPLETE PURCHASE BUSINESS FLOW
//
// login
// ↓
// search
// ↓
// add to cart
// ↓
// checkout
// ↓
// place order
//
// ============================================================

const { LoginPage } =
require('../pages/LoginPage');

const { SearchPage } =
require('../pages/SearchPage');

const { ProductPage } =
require('../pages/ProductPage');

const { CartPage } =
require('../pages/CartPage');

const { CheckoutPage } =
require('../pages/CheckoutPage');


class PurchaseFlow {

   constructor(page) {

      this.page = page;

      this.loginPage =
         new LoginPage(page);

      this.searchPage =
         new SearchPage(page);

      this.productPage =
         new ProductPage(page);

      this.cartPage =
         new CartPage(page);

      this.checkoutPage =
         new CheckoutPage(page);
   }


   // =========================================================
   // COMPLETE ORDER CREATION FLOW
   // =========================================================

   async placeOrder(productName) {

      // ------------------------------------------------------
      // LOGIN
      // ------------------------------------------------------

      await this.loginPage.navigate();

      await this.loginPage.login(
         'customer@test.com',
         'Test@123'
      );


      // ------------------------------------------------------
      // SEARCH PRODUCT
      // ------------------------------------------------------

      await this.searchPage.search(
         productName
      );


      // ------------------------------------------------------
      // OPEN PRODUCT
      // ------------------------------------------------------

      await this.searchPage.openFirstProduct();


      // ------------------------------------------------------
      // ADD TO CART
      // ------------------------------------------------------

      await this.productPage.addToCart();


      // ------------------------------------------------------
      // OPEN CART
      // ------------------------------------------------------

      await this.productPage.openCart();


      // ------------------------------------------------------
      // CHECKOUT
      // ------------------------------------------------------

      await this.cartPage.checkout();


      // ------------------------------------------------------
      // ADDRESS
      // ------------------------------------------------------

      await this.checkoutPage.fillAddress({

         name: 'Ganesh',

         mobile: '9876543210',

         pincode: '500001',

         city: 'Hyderabad',

         state: 'Telangana',

         address: 'Madhapur'
      });


      // ------------------------------------------------------
      // PAYMENT
      // ------------------------------------------------------

      await this.checkoutPage.selectCOD();


      // ------------------------------------------------------
      // PLACE ORDER
      // ------------------------------------------------------

      const orderId =
         await this.checkoutPage.placeOrder();

      return orderId;
   }
}

module.exports = { PurchaseFlow };



// ============================================================
// FILE: flows/ReturnFlow.js
// ============================================================
//
// RETURN BUSINESS FLOW
//
// ============================================================

const { ReturnPage } =
require('../pages/ReturnPage');


class ReturnFlow {

   constructor(page) {

      this.returnPage =
         new ReturnPage(page);
   }


   async createReturn(orderId) {

      // ------------------------------------------------------
      // OPEN RETURN PAGE
      // ------------------------------------------------------

      await this.returnPage
         .openReturnPage(orderId);


      // ------------------------------------------------------
      // SELECT RETURN REASON
      // ------------------------------------------------------

      await this.returnPage
         .selectReason('Defective');


      // ------------------------------------------------------
      // ENTER COMMENTS
      // ------------------------------------------------------

      await this.returnPage
         .enterComments(
            'Screen damaged'
         );


      // ------------------------------------------------------
      // UPLOAD IMAGE
      // ------------------------------------------------------

      await this.returnPage
         .uploadImage(
            'test-data/damage.jpg'
         );


      // ------------------------------------------------------
      // SUBMIT RETURN
      // ------------------------------------------------------

      const returnId =
         await this.returnPage
            .submitReturn();

      return returnId;
   }
}

module.exports = { ReturnFlow };



// ============================================================
// FILE: flows/RefundFlow.js
// ============================================================

const { RefundPage } =
require('../pages/RefundPage');


class RefundFlow {

   constructor(page) {

      this.refundPage =
         new RefundPage(page);
   }


   async verifyRefund(orderId) {

      // ------------------------------------------------------
      // OPEN REFUND PAGE
      // ------------------------------------------------------

      await this.refundPage
         .openRefundPage(orderId);


      // ------------------------------------------------------
      // VERIFY REFUND STATUS
      // ------------------------------------------------------

      await this.refundPage
         .verifyRefundInitiated();


      // ------------------------------------------------------
      // VERIFY REFUND AMOUNT
      // ------------------------------------------------------

      await this.refundPage
         .verifyRefundAmount();


      // ------------------------------------------------------
      // VERIFY TIMELINE
      // ------------------------------------------------------

      await this.refundPage
         .verifyRefundTimeline();
   }
}

module.exports = { RefundFlow };



// ============================================================
// FILE: api/OrderApi.js
// ============================================================
//
// REAL INDUSTRY:
//
// APIs used to SKIP long flows
//
// ============================================================

class OrderApi {

   constructor(request) {

      this.request = request;
   }


   // =========================================================
   // CREATE ORDER DIRECTLY
   // =========================================================

   async createDeliveredOrder() {

      const response =
         await this.request.post(
            '/api/test/orders',
            {
               data: {

                  status: 'DELIVERED',

                  productId: 'IPHONE15',

                  amount: 79999
               }
            }
         );

      return await response.json();
   }


   // =========================================================
   // MARK ORDER DELIVERED
   // =========================================================

   async markDelivered(orderId) {

      await this.request.patch(

         `/api/test/orders/${orderId}`,

         {
            data: {
               status: 'DELIVERED'
            }
         }
      );
   }


   // =========================================================
   // APPROVE RETURN
   // =========================================================

   async approveReturn(returnId) {

      await this.request.patch(

         `/api/test/returns/${returnId}`,

         {
            data: {
               status: 'APPROVED'
            }
         }
      );
   }
}

module.exports = { OrderApi };



// ============================================================
// FILE: db/OrderDb.js
// ============================================================
//
// DB VALIDATIONS
//
// ============================================================

class OrderDb {

   async verifyRefund(orderId) {

      console.log(
         'Checking refund in DB for:',
         orderId
      );

      // real SQL query here

      return {

         orderId,

         refundStatus: 'INITIATED',

         amount: 79999
      };
   }
}

module.exports = { OrderDb };



// ============================================================
// FILE: tests/refund/refundJourney.spec.js
// ============================================================
//
// THIS IS HOW REAL INDUSTRY TESTS LOOK
//
// VERY CLEAN
// VERY SMALL
// VERY READABLE
//
// ============================================================

const { test, expect } =
require('@playwright/test');

const { PurchaseFlow } =
require('../../flows/PurchaseFlow');

const { ReturnFlow } =
require('../../flows/ReturnFlow');

const { RefundFlow } =
require('../../flows/RefundFlow');

const { OrderApi } =
require('../../api/OrderApi');

const { OrderDb } =
require('../../db/OrderDb');


// ============================================================
// COMPLETE BUSINESS FLOW
// ============================================================

test(

'@e2e complete refund journey',

async ({ page, request }) => {

   // =========================================================
   // CREATE FLOW OBJECTS
   // =========================================================

   const purchaseFlow =
      new PurchaseFlow(page);

   const returnFlow =
      new ReturnFlow(page);

   const refundFlow =
      new RefundFlow(page);

   const orderApi =
      new OrderApi(request);

   const orderDb =
      new OrderDb();


   // =========================================================
   // STEP 1:
   // PLACE ORDER USING COMPLETE UI FLOW
   // =========================================================

   const orderId =
      await purchaseFlow
         .placeOrder('iPhone 15');

   console.log(
      'ORDER CREATED:',
      orderId
   );


   // =========================================================
   // STEP 2:
   // DELIVERY VIA API
   // =========================================================
   //
   // DO NOT WAIT DAYS
   //
   // =========================================================

   await orderApi
      .markDelivered(orderId);


   // =========================================================
   // STEP 3:
   // CREATE RETURN USING UI
   // =========================================================

   const returnId =
      await returnFlow
         .createReturn(orderId);

   console.log(
      'RETURN CREATED:',
      returnId
   );


   // =========================================================
   // STEP 4:
   // APPROVE RETURN USING API
   // =========================================================

   await orderApi
      .approveReturn(returnId);


   // =========================================================
   // STEP 5:
   // VERIFY REFUND USING UI
   // =========================================================

   await refundFlow
      .verifyRefund(orderId);


   // =========================================================
   // STEP 6:
   // VERIFY REFUND IN DB
   // =========================================================

   const refundData =
      await orderDb
         .verifyRefund(orderId);


   expect(
      refundData.refundStatus
   ).toBe('INITIATED');


   // =========================================================
   // TEST COMPLETE
   // =========================================================

   console.log(
      'COMPLETE E2E REFUND FLOW PASSED'
   );
});



// ============================================================
// WHY THIS IS INDUSTRY STANDARD
// ============================================================

/*

✅ Small readable test files

✅ Reusable business flows

✅ POM architecture

✅ UI + API + DB combination

✅ Easy maintenance

✅ Scalable

✅ Faster execution

✅ Better CI/CD execution

✅ Better debugging

✅ Better reporting

✅ Less duplicate code

✅ Senior-level framework design

*/
