import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiLogoChrome, BiUserCircle } from "react-icons/bi";

const BookModal = ({book, onClose, index}) => {
  return (
    <div
      className="fixed bg-black bg-opacity-60 top-0 left-0 bottom-0 right-0 z-50 flex justify-center  items-center "
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-[600px]  max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative "
      >
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer "
          onClick={onClose}
        />

        <h2 className="w-fit p-2 bg-red-300 rounded-lg">{book.publishYear}</h2>
        <h4 className="my-2 text-gray-500">{index + 1}</h4>
        <div className="flex justify-start books-center gap-x-2 ">
          <PiBookOpenTextLight className="text-red-300 text-2xl" />
          <h2 className="my-1">{book.title}</h2>
        </div>
        <div className="flex justify-start books-center gap-x-2 ">
          <BiUserCircle className="text-red-300 text-2xl" />
          <h2 className="my-1">{book.author}</h2>
        </div>
        <h2 className="mt-4 text-[16px] ">Some Tips to read books : </h2>
        <p className="my-2 ">
          Set a daily reading goal, even if it's just a few pages. 
          Create a quiet and comfortable reading space. <br/>
          Eliminate distractions like your phone or TV.<br/>
          Choose books that genuinely interest you. <br/>
          Take short breaks to stay focused. <br/>
          Use bookmarks to track progress.
        </p>
      </div>
    </div>
  );
};

export default BookModal;
