import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
import dotenv from 'dotenv'
dotenv.config()

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

// Upload image
export const uploadImage = async (imagePath) => {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      resource_type: "image",
    });

    return result.secure_url;

  } catch (error) {
    console.error("Cloudinary upload error:", error);

    throw new Error("Image upload failed");

  } finally {
    try {
      await fs.unlink(imagePath);
    } catch (error) {
      console.error("Temporary file deletion failed:", error.message);
    }
  }
};
