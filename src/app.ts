import express, { Application } from "express";
import CarsHandler from "../src/handlers/carsHandler";
import uploadFileUtil from "../src/utils/uploadFile";
import fileUploadsCloudinary from "../src/utils/fileUploadsCloudinary";

const app: Application = express();
const PORT: number = 8080;

app.use(express.json());

const carsHandler = new CarsHandler();

app.get("/api/cars", carsHandler.getCars);
app.get("/api/cars/:id", carsHandler.getCarsById);
app.post(
  "/api/cars",
  fileUploadsCloudinary.single("car_img"),
  carsHandler.createCar
);
app.put(
  "/api/cars/:id",
  uploadFileUtil.single("car_img"),
  carsHandler.updateCarById
);
app.delete("/api/cars/:id", carsHandler.deleteCarById);

app.listen(PORT, () => {
  console.log(`Server berjalan di localhost:${PORT}`);
});
