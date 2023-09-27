import React, { useState } from 'react'
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import dotenv from 'dotenv';
// dotenv.config();
// const BASE_URL = env.BASE_URL;
import { enqueueSnackbar, useSnackbar } from 'notistack';

const CreateBook = () => {
  const[title,setTitle]  = useState('');
  const[author,setAuthor] = useState('');
  const[publishYear,setPublishYear] = useState('');
  const [loading , setLoading] = useState(false);
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();

  const handleSaveBook =()=>{
    const data = {
      title, 
      author, 
      publishYear,
    };
    setLoading(true);
    axios.post(`${import.meta.env.VITE_BASE_URL}/book`,data)
    .then(()=>{
      setLoading(false);
      enqueueSnackbar('Book Created Successfully',{variant:'success'})
      navigate('/');


    })
    .catch((error)=>{
      setLoading(false);
      enqueueSnackbar('Error',{variant:'error'})
      // alert('An error happened , Please Try Again');
       console.log(error);
    })
  }

  return (
    <div className='p-4'>
    <BackButton/>
    <h1 className='text-3xl my-4'>Create Book</h1>
    {loading?(<Spinner/>): ''}
      
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
         <div className='my-4'>
         <label className='text-xl mr-4 text-gray-500' htmlFor='title'>Title</label>
         <input
                type='text'
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                className='border-2 border-gray-500 px-4 py-2 w-full'
                id='title'
                required
         />
         </div>
         <div className='my-4'>
         <label className='text-xl mr-4 text-gray-500' htmlFor='author'>Author</label>
         <input
                type='text'
                value={author}
                onChange={(e)=>setAuthor(e.target.value)}
                className='border-2 border-gray-500 px-4 py-2 w-full'
                id='author'
                required
         />
         </div>
         <div className='my-4'>
         <label className='text-xl mr-4 text-gray-500' htmlFor='publishYear'>Publish Year</label>
         <input
                type='text'
                value={publishYear}
                onChange={(e)=>setPublishYear(e.target.value)}
                className='border-2 border-gray-500 px-4 py-2 w-full'
                id='publishYear'
                required
         />
         </div>
          <button className='p-2 bg-sky-300 m-8' onClick={handleSaveBook}>Save Book </button>




        </div>
      
    

    </div>
  )
}

export default CreateBook