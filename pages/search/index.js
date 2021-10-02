import db from "../../firebase";

import { useRouter } from "next/router";
import SearchCourse from "../../components/Courses/SearchCourse";

function Search({ fullCourses }) {
  const router = useRouter();
  const randomNumber = Math.floor(Math.random() * 10000);

  const { input } = router.query;

  const filteredData = fullCourses.filter(
    ({ search }) => search === input
  );

  //   console.log(filteredData);

  return (
    <main className='bg-gray-50'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-2xl py-6 font-semibold border-b-2 '>
          {randomNumber} results for "{input}"
        </h1>

        <div className='flex flex-col spaxe-y-4'>
          {filteredData.map(
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
      </div>
    </main>
  );
}

export default Search;

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
