import Course from "./Course";

function CourseRow({ recommendedItems, title }) {
  return (
    <div className='flex flex-col  min-w-full my-8 ml-4 lg:ml-0'>
      <h1 className='text-2xl font-semibold mb-3'>
        {title}
      </h1>
      <div className='flex overflow-scroll scrollbar-hide mr-4 lg:mr-0'>
        {recommendedItems.map(
          ({ title, img, author, id }) => (
            <Course
              key={id}
              img={img}
              author={author}
              title={title}
              id={id}
            />
          )
        )}
      </div>
    </div>
  );
}

export default CourseRow;
