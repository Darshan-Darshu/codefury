import { loadStripe } from "@stripe/stripe-js";

let getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env.STRIPE_PUBLIC_KEY
    );
  }
  return stripePromise;
};

export default loadStripe;
