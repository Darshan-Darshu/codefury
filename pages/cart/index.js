import { useContext } from "react";
import SearchCourse from "../../components/Courses/SearchCourse";
import CartContext from "../../store/cart-context";
import { getSession, useSession } from "next-auth/client";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Footer from "../../components/Footer/Footer";

const stripePromise = loadStripe(
  process.env.stripe_public_key
);

function Cart({}) {
  const [session] = useSession();
  const cartCtx = useContext(CartContext);

  const createCheckoutSession = async () => {
    if (!session) {
      alert("First You Must SignIn");
      return;
    }

    if (cartCtx.items.length === 0) {
      alert("No Course In Cart");
      return;
    }
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

  const bgButton = session
    ? "bg-purple-500 text-white"
    : "bg-gray-500 text-black cursor-not-allowed";

  return (
    <>
      <main className='bg-gray-50 mb-6'>
        <h1 className='text-xl font-bold mt-5 ml-6 lg:ml-16'>
          My Order
        </h1>

        <div className='flex flex-col md:flex-row justify-between mx-auto'>
          <div className='flex flex-col flex-grow spaxe-y-4 ml-6 lg:ml-24'>
            {cartCtx.items.length !== 0 ? (
              cartCtx.items.map(
                ({ img, price, title, author }) => (
                  <SearchCourse
                    key={title}
                    img={img}
                    title={title}
                    author={author}
                    price={price}
                  />
                )
              )
            ) : (
              <h1 className='mt-5 text-3xl font-semibold'>
                "No courses in your cart"
              </h1>
            )}
          </div>

          <div className='h-42 p-6 border mx-6'>
            <h1 className='text-2xl font-bold'>
              Total Amount: {cartCtx.totalAmount}
            </h1>
            <button
              className={`${bgButton} mt-3 py-2 px-4`}
              onClick={createCheckoutSession}
              // disabled={!session}
            >
              Buy Now
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
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
