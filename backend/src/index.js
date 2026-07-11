import dotenv from "dotenv";
import express from "express";

import dbConnect from "./db/db_connect.js";

dotenv.config({
  path: "../.env",
});

 
const app = express();

dbConnect().then(()=>{
  app.listen(process.env.PORT || 8000 , ()=>{
    console.log(`App is listening on PORT ${process.env.PORT || 8000}`);
  })

}).catch((error)=>{
  console.log("Your app is either not connected to server or nor connected to DB",error);

});

