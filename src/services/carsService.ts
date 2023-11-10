import { CarRequest } from "../models/dto/car";
import { Car } from "../models/entity/car";
import CarsRepository from "../repositories/carsRepo";

class CarServices {
  static async getCars(): Promise<Car[]> {
    let listCar: Car[] = []

    listCar = await CarsRepository.getCarCache();

    if (listCar.length === 0) {
        listCar = await CarsRepository.getCars();
    }

    return listCar;
  }
  static async getCarsById(queryId: number): Promise<Car[]> {
    const listCar = await CarsRepository.getCarsById(queryId);
    return listCar;
  }
  static async createCar(car: CarRequest): Promise<Car> {
    const carToCreate: Car = {
      car_name: car.car_name,
      car_categories: car.car_categories,
      car_size: car.car_size,
      car_img: car.car_img,
    };
    const createdCar = await CarsRepository.createCar(carToCreate);

    const listCar = await CarsRepository.getCars();

    await CarsRepository.setCarCache(listCar);

    return createdCar;
  }

  static async updateCarById(
    queryId: number,
    car: CarRequest
  ): Promise<Car | null> {
    const carToUpdate: Car = {
      car_name: car.car_name,
      car_categories: car.car_categories,
      car_size: car.car_size,
      car_img: car.car_img,
    };
    const updatedCar = await CarsRepository.updateCarById(queryId, carToUpdate);
    return updatedCar;
  }

  static async deleteCarById(queryId: number): Promise<Car | null> {
    const deletedCar = await CarsRepository.deleteCarById(queryId);
    return deletedCar;
  }
}

export default CarServices;
