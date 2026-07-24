import dotenv from "dotenv";

import dbConnect from "./db/db_connect.js";
import { app } from "./app_config.js";

dotenv.config({
  path: "../.env",
});


dbConnect().then(()=>{
  app.listen(process.env.PORT || 8000 , ()=>{
    console.log(`App is listening on PORT ${process.env.PORT || 8000}`);
  })

}).catch((error)=>{
  console.log("Your app is either not connected to server or nor connected to DB",error);

});

