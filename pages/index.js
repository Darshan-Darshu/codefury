import Head from "next/head";
import Banner from "../components/Banner/Banner";
import CourseRow from "../components/Courses/CourseRow";
import HeaderDown from "../components/Header/HeaderDown";

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
