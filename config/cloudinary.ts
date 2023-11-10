import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "drfsdq9de", // TODO: Ganti dengan cloudname-mu
  api_key: "697165559319378", // TODO: Ganti dengan API Key-mu
  api_secret: "DjKF9hJ7SOvU5JYFnINm5co1kps", // TODO: Ganti dengan API Secret-mu
  secure: true,
});

export default cloudinary;