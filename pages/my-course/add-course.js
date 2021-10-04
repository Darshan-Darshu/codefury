import { useSession } from "next-auth/client";
import { useState } from "react";
import db from "../../firebase";

function addCourse() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setdescription] = useState("");
  const randomNumber = Math.random();

  const [session] = useSession();

  const addCourse = (e) => {
    e.preventDefault();
    try {
      db.collection("course").add({
        title,
        img: image,
        recommended: description,
        search: topic,
        author: session.user.name,
      });
      console.log("success");

      setTitle("");
      setImage("");
      setDescription("");
      setTopic("");

      alert(title, "added");
    } catch (err) {
      console.log(err);
    }
  };

  const titleChange = (e) => {
    setTitle(e.target.value);
  };
  const imageChange = (e) => {
    setImage(e.target.value);
  };
  const topicChange = (e) => {
    setTopic(e.target.value);
  };
  const descriptionChange = (e) => {
    setdescription(e.target.value);
  };
  return (
    <div className='mt-8'>
      <h1 className='text-center font-bold text-4xl'>
        Add Course
      </h1>
      <form
        className='mx-auto w-[16rem] md:w-[20rem] lg:w-[28rem] mt-5'
        onSubmit={addCourse}
      >
        <div>
          <label
            htmlFor='title'
            className=' text-purple-800 text-lg font-semibold'
          >
            Title
          </label>
          <input
            type='text'
            placeholder=''
            onChange={titleChange}
            className='border mb-2 mt-1 border-black w-full p-2'
          />
        </div>
        <div>
          <label
            htmlFor='image'
            className='mb-2 text-purple-800 text-lg font-semibold'
          >
            Image
          </label>
          <input
            type='text'
            placeholder=''
            className='border mt-1 mb-2 border-black w-full p-2'
            onChange={imageChange}
          />
        </div>
        <div>
          <label
            htmlFor=''
            className='mb-2 text-purple-800 text-lg font-semibold'
          >
            Topic
          </label>
          <input
            type='text'
            className='border mt-1 mb-2 border-black w-full p-2'
            onChange={topicChange}
          />
        </div>
        <div>
          <label
            htmlFor=''
            className='mb-2 text-purple-800 text-lg font-semibold'
          >
            Description
          </label>
          <input
            type='text'
            className='border mb-2 mt-1 border-black w-full p-2'
            onChange={descriptionChange}
          />
        </div>

        <button
          type='submit'
          className='py-2 px-4 text-white mt-8 bg-purple-600 hover:scale-95'
        >
          Add Course
        </button>
      </form>
    </div>
  );
}

export default addCourse;
