import poolRedis from "../../config/redis";
import { Car, CarEntity } from "../models/entity/car";
import { CarRequest } from "../models/dto/car";
import { raw } from "objection";

class CarsRepository {
  static async getCars(): Promise<Car[]> {
    const listCar = await CarEntity.query();
    return listCar;
  }

  static async getCarsById(queryId: number): Promise<Car[]> {
    const listCarById = await CarEntity.query().where("id", queryId);
    return listCarById;
  }

  static async createCar(car: Car): Promise<Car> {
    const createdCar = await CarEntity.query().insert({
      car_name: car.car_name,
      car_categories: car.car_categories,
      car_size: car.car_size,
      car_img: car.car_img,
    });

    return createdCar;
  }

  static async updateCarById(
    queryId: number,
    car: CarRequest
  ): Promise<Car | null> {
    const updateCar = await CarEntity.query().findById(queryId);

    if (updateCar) {
      await CarEntity.query().findById(queryId).patch({
        car_name: car.car_name,
        car_categories: car.car_categories,
        car_size: car.car_size,
        car_img: car.car_img,
      });
      return updateCar;
    } else {
      return null;
    }
  }

  static async deleteCarById(queryId: number): Promise<Car | null> {
    const deletedCar = await CarEntity.query().findById(queryId);

    if (deletedCar) {
      await CarEntity.query().findById(queryId).delete();
      return deletedCar;
    } else {
      return null;
    }
  }

  static async setCarCache(car: Car[]): Promise<void> {
    const redisPool = await poolRedis.createClient()
      .on("error", (err) => console.log("Redis Client Error", err))
      .connect();


    await redisPool.SET("car", JSON.stringify(car));
  }

  static async getCarCache(): Promise<Car[]> {
    const redisPool = await poolRedis.createClient()
      .on("error", (err) => console.log("Redis Client Error", err))
      .connect();

    const categoryListString = await redisPool.GET("car");
    let carList: Car[] = [];

    console.log('ini db pg', carList)

    if (categoryListString) {
        carList = JSON.parse(categoryListString);
        console.log('ini db redis', carList)
    }

    return carList;
  }

}

export default CarsRepository;