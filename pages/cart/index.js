import { useContext } from "react";
import SearchCourse from "../../components/Courses/SearchCourse";
import CartContext from "../../store/cart-context";
import { getSession, useSession } from "next-auth/client";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(
  process.env.stripe_public_key
);

function Cart({}) {
  const [session] = useSession();
  const cartCtx = useContext(CartContext);

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    // Call the the backend to create checkout session
    const checkoutSession = await axios.post(
      "/api/create-checkout-session",
      {
        items: cartCtx.items,
        email: session.user.email,
      }
    );

    // Redirect user/customer to stripe checkout session
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) {
      alert(result.error.message);
    }

    console.log("hello");
  };

  return (
    <main className='bg-gray-50'>
      <h1 className='text-xl font-bold mt-5 ml-6'>
        My Order
      </h1>

      <div className='flex justify-between mx-auto'>
        <div className='flex flex-col flex-grow spaxe-y-4 ml-6'>
          {cartCtx.items.map(
            ({ img, price, title, author }) => (
              <SearchCourse
                key={title}
                img={img}
                title={title}
                author={author}
                price={price}
              />
            )
          )}
        </div>

        <div className='h-42 p-6 border mx-6'>
          <h1 className='text-2xl font-bold'>
            Total Amount: {cartCtx.totalAmount}
          </h1>
          <button
            className='bg-purple-500 text-white mt-3 py-2 px-4'
            onClick={createCheckoutSession}
          >
            Buy Now
          </button>
        </div>
      </div>
    </main>
  );
}

export default Cart;

export async function getStaticProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
