import React, { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import Router from "next/router";

function SearchCourse({ img, title, author, id }) {
  const [rating] = useState(
    Math.floor(Math.random() * (5 - 1)) + 1
  );

  const [highestRated] = useState(Math.random() < 0.5);
  const [price] = useState(
    Math.floor(Math.random() * 10000)
  );

  const courseHandeler = () => {
    Router.push({
      pathname: "/course",
      query: {
        title,
        id,
        author,
        rating,
        price,
        highestRated,
        img,
      },
    });
  };

  return (
    <div
      onClick={courseHandeler}
      className='flex justify-between h-42 min-w-42 my-2 pb-2 mr-3 cursor-pointer transform transition duration-150 ease-out border-b'
    >
      <div className='w-42 h-42'>
        <img
          className='w-42 h-42 object-contain'
          src={img}
          alt=''
        />
      </div>
      <div className='flex flex-col justify-between flex-grow mx-5 h-42'>
        <h1 className='text-lg font-semibold leading-5'>
          {title}
        </h1>
        <p className='text-xs text-gray-500 mt-2 '>
          {author}
        </p>
        <div className='flex items-center space-x-1 mt-1 mb-8'>
          <p className='text-sm text-semibold text-yellow-800'>
            4.8
          </p>
          <div className='flex'>
            {Array(rating)
              .fill()
              .map((_, i) => (
                <StarIcon
                  key={i}
                  className='h-5 text-yellow-600'
                />
              ))}
          </div>
          <p className='text-sm text-gray-500'>(12,321)</p>
        </div>

        <div className='flex-grow'>
          {highestRated && (
            <h6 className='w-32 h-8 text-xs bg-yellow-500 pl-3 py-2 fle'>
              Highest Rated
            </h6>
          )}
          {!highestRated && (
            <h6 className='w-24 h-8 text-xs bg-yellow-200 pl-3 py-2'>
              Bestseller
            </h6>
          )}
        </div>
      </div>
      <h2 className='text-lg font-semibold '>₹ {price}</h2>
    </div>
  );
}

export default SearchCourse;
