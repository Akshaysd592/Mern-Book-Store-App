import React, { useState, useEffect } from 'react'
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar, useSnackbar } from 'notistack';
const EditBook = () => {
  const[title,setTitle]  = useState('');
  const[author,setAuthor] = useState('');
  const[publishYear,setPublishYear] = useState('');
  const [loading , setLoading] = useState(false);
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();
  const BASE_URL = process.env.BASE_URL;
  const {id} = useParams();
  useEffect(()=>{
    setLoading(true);
    axios.get(`${BASE_URL}/book/${id}`)
    .then((response)=>{
      setTitle(response.data.title);
      setAuthor(response.data.author);
      setPublishYear(response.data.publishYear);
      setLoading(false);
    

    })
    .catch((error)=>{
      setLoading(false);
      console.log("Can not edit book data");
      enqueueSnackbar('Book can not be Edited',{variant:'error'})
      // alert("Can not edit Book now , Try again Later");
      console.log(error);

    })
  },[])

  const handleEditBook =()=>{
    const data = {
      title, 
      author, 
      publishYear,
    };
    setLoading(true);
    axios.put(`${BASE_URL}/book/${id}`,data)
    .then(()=>{
      setLoading(true);
      enqueueSnackbar('Book Edited Successfully',{variant:'success'})
      navigate('/');


    })
    .catch((error)=>{
      setLoading(false);
      enqueueSnackbar('Book can not be Edited',{variant:'error'})
       console.log(error);
    })
  }

  return (
    <div className='p-4'>
    <BackButton/>
    <h1 className='text-3xl my-4'>Edit Book</h1>
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
                required={true}
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
                required={true}
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
                required={true}
         />
         </div>
          <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>Save Book </button>




        </div>
      
    

    </div>
  )
}

export default EditBook