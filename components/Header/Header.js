import {
  SearchIcon,
  HeartIcon,
  ShoppingCartIcon,
  BellIcon,
  MenuIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import { MicrophoneIcon } from "@heroicons/react/solid";
import { Avatar } from "@material-ui/core";
import Router from "next/router";
import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import {
  signIn,
  signOut,
  useSession,
} from "next-auth/client";

function Header() {
  const [input, setInput] = useState("");
  const [session] = useSession();
  const cartCtx = useContext(CartContext);

  // const numberOfCartItems = cartCtx.items.reduce(
  //   (curNumber, item) => {
  //     return curNumber + item.amount;
  //   },
  //   0
  // );

  const submitHandler = (e) => {
    e.preventDefault();
    Router.push({
      pathname: "/search",
      query: {
        input,
      },
    });

    setInput("");
  };

  const inputChangeHandler = (e) => {
    setInput(e.target.value);
  };

  return (
    <nav className='sticky top-0 h-20 flex items-center justify-between border-b-2 z-50 p-4 bg-white shadow-md'>
      <div className='flex items-center mr-4 ml-2 space-x-4'>
        <h1 className='text-xl md:text-2xl lg:text-4xl font-semibold cursor-pointer text-purple-900'>
          CODEFURY
        </h1>
        <p className='hidden lg:flex text-sm cursor-pointer hover:text-purple-800'>
          Problems
        </p>
      </div>

      <form className='flex items-center justify-between border flex-grow border-black rounded-full p-3 bg-blue-50'>
        <MicrophoneIcon className='h-6 text-purple-800' />
        <input
          value={input}
          className='w-full outline-none ml-3 bg-transparent placeholder-gray-400 text-sm'
          type='text'
          onChange={inputChangeHandler}
          placeholder='Search for anything'
        />
        <SearchIcon className='h-6 ml-2' />

        <button
          className='hidden'
          type='submit'
          onClick={submitHandler}
        >
          Submit
        </button>
      </form>

      <div className='hidden lg:flex items-center space-x-8 ml-6'>
        <ul>
          <li className='text-sm cursor-pointer hover:text-purple-800 active:scale-95 transition duration-200 ease-out'>
            My Courses
          </li>
        </ul>
        <ul>
          <li className='text-sm cursor-pointer hover:text-purple-800'>
            <Link href='https://1-1-session.netlify.app/'>
              1 - 1 Session
            </Link>
          </li>
        </ul>
        <ul>
          <li className='text-sm cursor-pointer hover:text-purple-800'>
            Meeting
          </li>
        </ul>
      </div>

      <div className='flex items-center space-x-8 ml-8 mr-4'>
        <HeartIcon className='hidden md:flex h-6 hover:text-purple-800 cursor-pointer' />
        <Link href='/cart'>
          <div className='relative flex items-center'>
            <ShoppingCartIcon className='hidden md:flex h-6 hover:text-purple-800 cursor-pointer' />

            <div className='hidden md:flex absolute -top-2 -right-2 h-4 w-4 bg-purple-400 text-xs rounded-full'>
              <span className='ml-1'>
                {cartCtx.items.length}
              </span>
            </div>
          </div>
        </Link>
        <BellIcon className='hidden md:flex h-6 hover:text-purple-800 cursor-pointer' />
        {!session ? (
          <button
            className='bg-purple-600 py-2 px-4 text-white rounded-full'
            onClick={signIn}
          >
            Sign In
          </button>
        ) : (
          <div className='cursor-pointer' onClick={signOut}>
            <Avatar src={session.user.image} />
          </div>
        )}
        <MenuIcon className='flex md:hidden h-6' />
      </div>
    </nav>
  );
}

export default Header;
