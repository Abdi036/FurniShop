const Stripe = require("stripe");
const stripeSecretKey =
  "sk_test_51Q4g1rHPV8dRqPYiAfiwNSRQ2hhCpxPcZXBNkwLJLXYYXMjh4POK2aAVu00c5i7jeYy6cSsl58e63SjqBbIaL0k100ro4yQPsP";

exports.createPaymentIntent = async (req, res) => {
  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2024-06-20",
  });
  try {
    const { products } = req.body;

    const lineItems = products.map((product) => {
      return {
        quantity: product.quantity,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(product.price * 100),
          product_data: {
            name: product.name,
            images: [`http://localhost:5000/productImages/${product.photo}`],
          },
        },
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    // Return session ID to the frontend
    res.status(200).json({
      id: session.id,
    });
  } catch (error) {
    res.status(500).json({ message: "Payment failed", error: error.message });
  }
};
