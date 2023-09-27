import React, { useState } from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import axios from 'axios'
import Spinner from '../components/Spinner'
// import dotenv from 'dotenv';
// dotenv.config();
// const BASE_URL = env.BASE_URL;
import { useSnackbar } from 'notistack'

const DeleteBook = () => {
  const [loading,setLoading] = useState(false);
  const {id} = useParams();
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();

  const handleDeleteBook = () =>{
    setLoading(true);
    axios.delete(`${import.meta.env.VITE_BASE_URL}/book/${id}`)
    .then(()=>{
        setLoading(false);
        enqueueSnackbar('Book Deleted successfully',{variant:'success'});
        navigate('/');
      
    })
    .catch((error)=>{
        console.log(error.message);
        setLoading(false);
        enqueueSnackbar('Book can not be Deleted ', {variant:'error'});

        // alert('Can not delete Book , Please try again later...')
    })
  }
  return (
    <div className='p-4'>
    <BackButton/>
    <h1 className='text-3xl my-4'>Delete Book </h1>
    {
      loading? (<Spinner/>):""
    }

    <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
      <h3 className='text-2xl'>Are You Sure , You Want to delete this Book</h3>
      <button
      className='p-4 bg-red-600 text-white m-8 w-full '
      onClick={handleDeleteBook}
      > Yes , Delete it </button>
    </div>

    </div>
  )
}

export default DeleteBook