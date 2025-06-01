
const express = require("express");


const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(cors({origin: true}));
app.use(express.json());


app.get("/", (req, res) => {{
    res.status(200).json({message: "Hello from Firebase!"});
}});



app.post("/payment/create", async (req, res) => {
  const total = req.query.total;

  if (total > 0) {
    console.log("Payment Request Received for this amount >>>", total);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });

    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });
  } else {
    res.status(403).json({ error: "Invalid amount, it is less than zero" });
  }
});




app.listen(5000, (error) => {
    if (error) {
        console.error("Error starting the server:", error);
        return;
    }else {
        console.log("Server is running on port 5000");
    }
 
})
