import Head from "next/head";
import Banner from "../components/Banner/Banner";
import CourseRow from "../components/Courses/CourseRow";
import Footer from "../components/Footer/Footer";
import HeaderDown from "../components/Header/HeaderDown";
import Link from "next/link";

import db from "../firebase";

export default function Home({
  recommendedItems,
  recommendedPopluar,
  recommendedSql,
  recommendedSweet,
}) {
  return (
    <div>
      <Head>
        <title>
          CODEFURY - Darshan - Sanju - Siddharth
        </title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <HeaderDown />

      <main className='bg-gray-100'>
        <div className='max-w-7xl mx-auto'>
          <Banner />

          <section className='mt-5'>
            <h1 className='text-3xl ml-4 lg:ml-0'>
              What to learn Next
            </h1>
            <CourseRow
              recommendedItems={recommendedItems}
              title='Recommended for you'
            />

            <section className='flex gap-5 lg:flex-row flex-col my-12 mr-4 items-center justify-between'>
              <div className='flex flex-col rounded-md w-80 h-42 bg-white border border-white shadow-2xl items-center p-4'>
                <h1 className='text-2xl text-purple-700 pt-3 font-semibold'>
                  LIVE COURSES
                </h1>
                <p className='p-6 italic ...'>
                  Real Time Live classes accessible from the
                  comfort of your Home
                </p>

                <button
                  className='w-32 h-12 bg-purple-500 text-white rounded-lg hover:bg-purple-700'
                  type=''
                >
                  <Link href='https://1-1-session.netlify.app/'>
                    Explore
                  </Link>
                </button>
              </div>
              <div className='flex flex-col rounded-md w-80 h-42 bg-white border border-white shadow-2xl items-center p-4'>
                <h1 className=' text-purple-700  text-2xl font-semibold '>
                  ONLINE COURSES
                </h1>
                <p className='p-6 italic ...'>
                  Self paced Learning with Structured
                  premium vedio Lectures
                </p>

                <button
                  className='w-32 h-12 bg-purple-500 text-white rounded-lg hover:bg-purple-700'
                  type=''
                >
                  <Link href='/my-course'>Explore</Link>
                </button>
              </div>
              <div className='flex flex-col rounded-md w-80 h-42 bg-white  border border-white shadow-2xl items-center p-4'>
                <h1 className=' text-purple-700  text-2xl font-semibold '>
                  ONLINE ASSESSMENT
                </h1>
                <p className='p-6 italic ...'>
                  A free tool helping educators easily
                  manage and deliver performance
                  assessments.
                </p>
                <button
                  className='w-32 h-12 bg-purple-500 text-white rounded-lg hover:bg-purple-700 '
                  type=''
                >
                  Explore
                </button>
              </div>
            </section>

            <CourseRow
              recommendedItems={recommendedPopluar}
              title='Most Popular'
            />
            <CourseRow
              recommendedItems={recommendedSql}
              title='Mysql'
            />
            <CourseRow
              recommendedItems={recommendedSweet}
              title='Sweet'
            />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  let recommendedItems = [];
  let recommendedPopluar = [];
  let recommendedSql = [];
  let recommendedSweet = [];
  let allData = [];

  try {
    const response = await db.collection("course").get();

    response.docs.forEach((doc) => {
      allData = [...allData, { id: doc.id, ...doc.data() }];
      switch (doc.data().recommended) {
        case "recommended for you":
          recommendedItems = [
            ...recommendedItems,
            { id: doc.id, ...doc.data() },
          ];
          break;
        case "Most popular":
          recommendedPopluar = [
            ...recommendedPopluar,
            { id: doc.id, ...doc.data() },
          ];
          break;
        case "Microsoft SQL":
          recommendedSql = [
            ...recommendedSql,
            { id: doc.id, ...doc.data() },
          ];
          break;
        case "sweet":
          recommendedSweet = [
            ...recommendedSweet,
            { id: doc.id, ...doc.data() },
          ];
          break;
        default:
          break;
      }
      // });
    });
  } catch (e) {
    console.log(e);
  }

  return {
    props: {
      recommendedItems,
      recommendedPopluar,
      recommendedSql,
      recommendedSweet,
      fullCourses: allData,
    },
  };
}
