import Link from "next/link";
import { HeartIcon } from "@heroicons/react/outline";
import { StarIcon, PlayIcon } from "@heroicons/react/solid";

import { useRouter } from "next/router";

function CourseDetails() {
  const router = useRouter();

  const {
    title,
    author,
    price,
    rating,
    highestRated,
    img,
  } = router.query;

  const redirectToCheckout = async () => {
    const {
      data: { id },
    } = await axios.post("/api/checkout_session", {
      items: Object.entries(cartDetails).map(
        ([_, { id, quantity }]) => ({
          price: id,
          quantity,
        })
      ),
    });

    const stripe = await getStripe();
    await stripe.redirectToCheckout({ sessionId: id });
  };
  return (
    <>
      <main className=''>
        <section className='bg-black h-[26rem] sm:h-96 shadow-md'>
          <div className='flex flex-col lg:flex-row px-5 max-w-5xl text-white mx-auto'>
            <div className=''>
              <ul className='flex text-purple-400 space-x-2 text-md font-semibold py-5'>
                <li>
                  <Link href='/'>Home</Link>
                  <span className='ml-2'>{">"}</span>
                </li>
                <li>
                  <Link href='/course'>Course</Link>
                  <span className='ml-2'>{">"}</span>
                </li>
                <li></li>
              </ul>

              <h1 className='text-4xl font-bold'>
                {title}
              </h1>

              <p className='text-lg mt-3'>
                Helping Educators take control over there
                own Professional Development
              </p>

              <div className='flex items-center space-x-1 mt-3 text-black font-semibold'>
                <div className='flex items-center justify-center'>
                  {highestRated && (
                    <h6 className='w-24 h-8 text-xs bg-yellow-500 pl-3 py-2 '>
                      Highest Rated
                    </h6>
                  )}
                  {!highestRated && (
                    <h6 className='w-20 it h-8 mr-2 my-auto text-xs bg-yellow-200 pl-3 py-2'>
                      Bestseller
                    </h6>
                  )}
                </div>
                <p className='text-sm text-semibold text-yellow-300'>
                  4.8
                </p>
                <div className='flex'>
                  {Array(rating)
                    .fill()
                    .map((_, i) => (
                      <StarIcon
                        key={i}
                        className='h-4 text-yellow-300'
                      />
                    ))}
                </div>
                <p className='text-xs underline'>
                  <span className='pb-1 text-purple-300 underline'>
                    (12,321 rating)
                  </span>
                </p>
                <p className='text-xs ml-3 underline'>
                  <span className='pb-1 text-white'>
                    14,235 students
                  </span>
                </p>
              </div>

              <p className='text-sm mt-4'>
                Created by{" "}
                <span className='text-purple-300 underline'>
                  {author}
                </span>{" "}
              </p>

              <p className='text-sm mt-5'>
                Last updated 9/2021
              </p>
            </div>

            <div className='bg-white mt-8 border h-[25rem] border-white shadow-2xl'>
              <div className='relative'>
                <img
                  src={img}
                  alt={title}
                  className='h-[10rem] w-[28rem] object-cover'
                />
                <div className='absolute top-0 w-full h-full bg-black opacity-50' />
                <div className='absolute top-0 w-full h-full flex items-center justify-center'>
                  <PlayIcon className='h-16' />
                </div>
                <div className='flex justify-center'>
                  <p className='absolute bottom-2 font-semibold text-sm'>
                    Preview this Course
                  </p>
                </div>
              </div>

              <div className='text-black mt-6 mx-4'>
                <h1 className='text-4xl font-bold'>
                  ₹ {price}
                </h1>
                <div className='flex items-center justify-between'>
                  <button className='flex-grow bg-purple-700 text-white p-3 mt-4 mr-3 text-md font-semibold'>
                    Add to Cart
                  </button>
                  <div className='border border-black p-3 -mb-4 '>
                    <HeartIcon className='h-5' />
                  </div>
                </div>
                <button className='w-full bg-gray-200 text-black p-3 mt-4 mr-3 text-md font-semibold border border-black'>
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          <div className='border border-gray-200 w-[30rem] mx-auto md:w-[40rem] lg:w-[50rem] lg:mx-[14rem] p-5 shadow-md mt-4'>
            <h1 className='text-xl font-bold'>
              What you'll learn
            </h1>
            <div className=' mt-2 flex flex-col lg:flex-row lg:space-x-2 text-gray-700 text-sm'>
              <ol className='space-y-3'>
                <li>
                  Learn, implement, and use different Data
                  Structures
                </li>
                <li>
                  Learn, implement and use different
                  Algorithms
                </li>
                <li>Get more interviews</li>
                <li>
                  Professionally handle offers and negotiate
                  raises
                </li>
              </ol>
              <ol className='space-y-3'>
                <li>
                  Ace coding interviews given by some of the
                  top tech companies
                </li>
                <li>
                  Become a better developer by mastering
                  computer science fundamentals
                </li>
                <li>
                  Become more confident and prepared for
                  your next coding interview
                </li>
              </ol>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default CourseDetails;
