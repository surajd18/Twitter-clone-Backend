import { v2 as cloudinary } from "cloudinary";
import fs from "fs";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadFileOnCoudinary = async (localfilePath) => {
  console.log("Local file link----->",localfilePath)
  try {
    if (!localfilePath) return null;
    const response = await cloudinary.uploader.upload(localfilePath, {
      resource_type: "auto",
    });
    console.log("File uploaded successfully..!",response.url);
    fs.unlinkSync(localfilePath)
    return response;

  } catch (error) {
    console.log("error------------>",error)
    fs.unlinkSync(localfilePath)  //remove the locally stored temporary file as the upload operation failed.
    return null;
  }
};

export {uploadFileOnCoudinary};
