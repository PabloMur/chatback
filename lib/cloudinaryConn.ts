import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "fps-devs",
  api_key: "586389221448689",
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { cloudinary };
