const express = require('express');
const app = express();
const stripe = require('stripe')('sk_test_51NWyK6SC7WXy8eUt5PPBT4xMp8rxYECwTb1IQXCpsltyc9GC9XvtC3vd6gwVnfKkKT2cdcv3LRGfYyKlNguhqfMh00VmZuOhbW');
const cors = require('cors');
const path = require('path'); // Import the path module

app.use(express.json());
app.use(cors());

// const storeItems = new Map([
//    [1, { priceInPaise: 15000, name: 'Watch Movie 1 Today' }],
//    // [2, { priceInPaise: 25000, name: 'Watch Movie 2 Today' }],
// ]);

app.post('/create-checkout-session', async (req, res) => {
   try {
      const session = await stripe.checkout.sessions.create({
         payment_method_types: ['card'],
         mode: 'payment',
         line_items: req.body.items.map(item => {
            return {
               price_data: {
                  currency: 'inr',
                  product_data: {
                     name: item.movieName,
                     images: [item.imageUrl],
                     description: `Paying for ${item.numTickets} tickets of ${item.movieName}`,
                  },
                  unit_amount: item.totalPayment * 100,
               },
               quantity: 1,
               // description: `Movie: ${item.movieName}, Amount: ₹${item.totalPayment}, Tickets: ${item.numTickets}`,
            };
         }),
         success_url: `http://localhost:3000/paySuccess`,
         cancel_url: `http://localhost:3000/payFailure`,
      });
      res.json({ url: session.url });
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
});

// Serve the built Vue app from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// All other requests will serve the index.html file from the 'dist' directory
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
