import express from 'express';
// import { PORT ,Mongodb_url} from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/BookSchema.js';
import bookRoutes from './routes/bookRoutes.js';
import cors from 'cors';
import dotenv from 'dotenv';
 
dotenv.config();

const Mongodb_url = process.env.Mongodb_url;
const PORT  = process.env.PORT;



const app = express();


// adding a middleware
app.use(express.json());

// middleware to connected with frondend using cors
app.use(cors());

// app.use(cors({
//     origin:"http://localhost:3000",
//     methods:["GET","PUT","POST","DELETE"],
//     allowedHeaders:['Content-Type'],
// }))

// api route for / 

app.get('/',(req,res)=>{
      console.log("Home page");
      res.send("This is the Home Page");
        
})

// using routes
app.use('/book',bookRoutes);


mongoose.connect(Mongodb_url)
.then(()=>{console.log("DB connected successfully")

   // started the server when db connected successfully
    app.listen(PORT,()=>{
        console.log(`App is listening at port ${PORT}`);
    })

}

)
.catch(()=>console.log("Db can not be connected"))




