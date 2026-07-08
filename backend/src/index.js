import dotenv from "dotenv";
import express from "express";

import dbConnect from "./db/db_connect.js";

dotenv.config({
  path: "../.env",
});

 
const app = express();



const startServer = async () => {
  await dbConnect().then(()=>{
    app.listen(process.env.PORT || 3000, () => {
    console.log(`App is listening on port ${process.env.PORT || 3000}`);
  })
  }).catch((err)=>{
    console.log("MongoDB connection failed !! ",err);
  })
  
};

startServer();




















// ( async() => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URI}/${
//         DB_NAME
//     }`)

//     app.listen(process.env.PORT, ()=>{
//         console.log("App is listening on port $ {process.env.PORT}")
//     })


//   } catch (error) {
//     console.log("ERROR : ",error)
//     throw err
//   }
// })();


