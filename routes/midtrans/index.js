const express = require('express');
const midtransClient = require('midtrans-client');
require('dotenv').config();
const app = express.Router();

app.post('/pay', (req, res) => {
  // Create Snap API instance

  const randomId = Math.floor(Math.random() * 100000);

  const { amount, item_name } = req.body;

  let snap = new midtransClient.Snap({
    // Set to true if you want Production Environment (accept real transaction).
    isProduction: process.env.NODE_ENV === 'development' ? false : true,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
  });

  let parameter = {
    transaction_details: {
      order_id: `ShalmaKevinWedding-${randomId}`,
      gross_amount: amount,
    },
    credit_card: {
      secure: true,
    },
    item_details: [
      {
        price: amount,
        quantity: 1,
        name: item_name,
      },
    ],
  };

  snap
    .createTransaction(parameter)
    .then((transaction) => {
      res.status(200).send(transaction);
    })
    .catch((err) => {
      res.status(500).send({
        error: 'Failed processing your transaction!',
        message: err,
      });
    });
});

module.exports = app;
