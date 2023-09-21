import express from 'express';
// import { Book } from '../models/BookSchema';
import { Book } from '../models/BookSchema.js';



const router = express.Router();



 // create routes for working

router.post('/',async(req,res)=>{
    try {
      const {title,author,publishYear} = req.body;

      if(!title || !author || !publishYear){
       return res.status(400).send({
           message:"All fields are required",
       })
      }

      const book = { // don't need to write title:title because having same name on both side
       title:title,
       author:author,
       publishYear:publishYear,
      }
       
      const bookstored = await Book.create(book);

      return res.status(200).send(bookstored);

    } catch (error) {
       console.log("Can not create a book entry");
       return res.status(400).send({
          messase:"Can not create a book entry",
       }
       )
    }
})


// To get all the book available in database
router.get('/',async (req,res)=>{
   try {
       const allbooks = await Book.find({});

       if(!allbooks){
           return res.status(404).json({
               message:"No book is available"
           })
       }

       // return res.status(200).send(allbooks);
       return res.status(200).json({
           count :allbooks.length,
           data: allbooks

       })
       // return res.status(200).json({
       //     success:true,
       //     message:"Data fetched successfully",
       //    data: allbooks
       // })
       
   } catch (error) {

       return res.status(500).json({
           message:"Can not get all the books",
       })
   }
})


// route to get only one book by id

router.get('/:id',async(req,res)=>{
   try {
       const {id} = req.params;

       if(id.length<=0){
           return res.status(400).json({
               success:false,
               message:"id is required",
           })
       }

       const singlebook = await Book.findById(id);
       if(!singlebook){
           return res.status(400).json({
               message:"Book not found"
           })
       }

       return res.status(200).json(singlebook);

       
   } catch (error) {
       console.log(error.message);
       return res.status(404).json({
           message:"can not find data for given id"
       })
   }
})


// update book details

router.put('/:id',async(req,res)=>{
   try {
       const {id} = req.params;
       const {title,author,publishYear} = req.body;


       const dataupdate  = await Book.findByIdAndUpdate(id,{
                   title,
                   author,
                   publishYear
       },
       {new:true}
           )

           if(!dataupdate){
               return res.status(400).json({
                   message:"Book not Found"
               })
           }
       
           return res.status(200).json({
               message:"Book updated successfully",
               dataupdate
           })

   } catch (error) {
       console.log(error.message)
       return res.status(400).json({
           success:false,
           message:"Book can not be updated"
       })
   }
})



// delete a book
router.delete("/:id",async(req,res)=>{
   try {

       const {id} = req.params;

       const datadelete =  await Book.findByIdAndDelete(id);

       if(!datadelete){
           return res.status(400).json({
               message:"Book not Found "
           })
       }

       return res.status(200).json({
           message:"Book deleted successfully",
           datadelete
       })
       
   } catch (error) {
       console.log("Book can not be deleted")
       return res.status(400).json({
           message:"Book can not deleted",
       })
   }
})


export default router;