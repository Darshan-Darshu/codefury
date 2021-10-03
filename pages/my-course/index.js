import Course from "../../components/Courses/Course";
import db from "../../firebase";
import Router from "next/router";
import Link from "next/link";
import Footer from "../../components/Footer/Footer";

function MyCourse({ fullCourses }) {
  const courseHandeler = (id) => {
    const filterdata = fullCourses.filter(
      (c) => c.id === id
    );

    Router.push({
      pathname: "/course",
      query: {
        img: filterdata.img,
        title: filterdata.title,
        author: filterdata.author,
      },
    });
  };

  return (
    <>
      <main className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2'>
        <div className='flex justify-between p-3 items-center col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-4 bg-purple-700 text-white'>
          <h1 className='text-3xl font-semibold ml-4 '>
            My Course
          </h1>
          <Link href='/my-course/add-course'>
            <h1 className='text-1xl font-semibold mr-4 hover:text-white cursor-pointer'>
              Add Course
            </h1>
          </Link>
        </div>
        {fullCourses.map(({ img, title, author, id }) => (
          <div
            className='mt-10'
            onClick={() => courseHandeler(id)}
          >
            <Course
              key={id}
              title={title}
              author={author}
              img={img}
            />
          </div>
        ))}
      </main>

      <Footer />
    </>
  );
}

export default MyCourse;

export async function getServerSideProps() {
  let allData = [];

  try {
    const response = await db.collection("course").get();

    response.docs.forEach((doc) => {
      allData = [...allData, { id: doc.id, ...doc.data() }];
      // });
    });
  } catch (e) {
    console.log(e);
  }

  return {
    props: {
      fullCourses: allData,
    },
  };
}
