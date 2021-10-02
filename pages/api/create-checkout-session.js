const stripe = require("stripe")(
  process.env.STRIPE_SECRET_KEY
);

export default async (req, res) => {
  const { items, email } = req.body;

  console.log(email, items);

  const transformedItems = items.map((item) => ({
    quantity: 1,
    price_data: {
      currency: "inr",
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        images: [item.img],
      },
    },
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_rates: ["shr_1JgHNDSDBTNUo2qCUnbojo4w"],
    shipping_address_collection: {
      allowed_countries: ["GB", "US", "CA", "IN"],
    },
    line_items: transformedItems,
    mode: "payment",
    success_url: `${process.env.HOST}/`,
    cancel_url: `${process.env.HOST}/cart`,
    metadata: {
      email,
      images: JSON.stringify(items.map((item) => item.img)),
    },
  });

  res.status(200).json({ id: session.id });
};
