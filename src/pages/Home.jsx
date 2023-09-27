import React from 'react'
import { useEffect,useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import {AiOutlineDelete, AiOutlineEdit} from 'react-icons/ai';
import {BsInfoCircle} from 'react-icons/bs';
import {MdOutlineAddBox , MdOutlineDelete} from 'react-icons/md';
import BookTable from '../components/Home/BookTable';
import BookCards from '../components/Home/BookCards';
// import dotenv from 'dotenv';
// dotenv.config();
// const BASE_URL = process.env.BASE_URL;
// import.meta.env.VITE_BASE_URL;

const Home = () => {
    const [books,setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState('card');
    // const BASE_URL = process.env.BASE_URL;
    

    useEffect(()=>{
        setLoading(true);
        axios.get(`${import.meta.env.VITE_BASE_URL}/book/`)
        .then((response)=>{
                // console.log(response.data)
                console.log("before call",response.data.data)
                setBooks(response.data.data);
                 
                 setLoading(false);
        })
        .catch((error)=>{
            console.log(error.message);
            setLoading(false);
        });
        
    },[]);


  return (
    <div className='p-4 '>
            <div className='flex justify-center items-center gap-x-4'>
                <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg ' onClick={()=>setShowType('table')}>Table</button>
                <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg ' onClick={()=>setShowType('card')}>Card</button>
            </div>

         
        <div className='flex justify-between items-center'>
           <h1 className='text-3xl my-8 text-cyan-600 '>Book List</h1>
              <Link to='/books/create'>
                 <MdOutlineAddBox className='text-sky-800 text-4xl'/>
              </Link>
        </div>
        {
            loading?(<Spinner/> ):
            (showType =='table' ? (<BookTable books={books}/>): (<BookCards books={books}/>)  )}
    </div>
  )
}

export default Home;