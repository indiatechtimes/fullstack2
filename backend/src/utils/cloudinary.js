import { v2 as cloudinary } from 'cloudinary';

import fs from "fs";

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {

        if(!localFilePath){
            return "Select your file"
        }

        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        
        // if file is uploaded on cloudinary succesfully

        console.log("file is uploaded succesfully on cloudinary",response.url);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath)// remove the locally saved temporary file as the upload operarion got failed
        return null;

    }
}

export {uploadOnCloudinary} 
