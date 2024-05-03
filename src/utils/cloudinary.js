import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
          



const uploadCloudinary = async (localFilePath) =>{
      try{
            if(!localFilePath)return null
            //upload the file on cloudinary
          const response = await  cloudinary.uploader.upload(localFilePath, {
                  resource_type: "auto"
            })
            // file has been uploaded successfully 
            console.log("file is uploaded on cloudinary", response.url)
      }catch(error){
            fs.unlinkSync(localFilePath)// remove the locally savced temporary file as the upload operation got failed
            return null;
      }
}
