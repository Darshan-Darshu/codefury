import Image from "next/image";

function Banner() {
  return (
    <div className='relative'>
      <div className='relative h-[300px] md:h-[400px] lg:[480px]'>
        <Image
          src='https://s.udemycdn.com/logout/ufb-logout-hero-desktop-v2.jpg'
          layout='fill'
          objectFit='cover'
        />
      </div>
      <div className='absolute top-1/4 md:h-44 w-40 md:w-96 md:m-w-42 ml-6 p-4 shadow-md bg-white'>
        <h1 className='text-2xl md:text-4xl md:w-80'>
          Learning that gets you
        </h1>
        <p className='text-xs font-semibold text-gray-500 md:w-80 mt-4'>
          Skills for you present (and your future) started
          with us
        </p>
      </div>
    </div>
  );
}

export default Banner;
