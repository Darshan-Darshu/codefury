import React, { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import Router from "next/router";

function Course({ img, title, author, id }) {
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
      className='flex flex-col justify-between h-[340px] min-w-[280px] mr-3 cursor-pointer hover:scale-105 transform transition duration-150 ease-out'
    >
      <div className='w-full'>
        <img
          className='w-full object-cover'
          src={img}
          alt=''
        />
      </div>
      <div className='flex flex-col flex-grow'>
        <h1 className='text-lg font-semibold mt-3 leading-5'>
          {title}
        </h1>
        <p className='text-xs text-gray-500 mt-1'>
          {author}
        </p>
        <div className='flex items-center space-x-1 mt-1'>
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
        <h2 className='text-lg font-semibold flex-grow'>
          ₹ {price}
        </h2>
        {highestRated && (
          <h6 className='w-32 h-8 text-xs bg-yellow-500 pl-3 py-2'>
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
  );
}

export default Course;
