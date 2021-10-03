module.exports = {
  images: {
    domains: ["s.udemycdn.com", "codefury.herokuapp.com"],
  },

  env: {
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
  },
};
