type VehicleType = 'car' | 'van' | 'truck'; // etc
type Timestamp = number;

interface Vehicle {
  make: string;
  model: string;
  licensePlate: string;
  class: VehicleType[]
}

interface ParkingSpace {
  num: number;
  supportedTypes: Vehicle;
  timeOccupied: Timestamp;
  costPerHour: number;
};

class ParkingLot {
  spaces: {[spaceNum: string]: ParkingSpace};
  freeSpaces: ParkingSpace[];

  // returns if the vehicle is available
  isAvailable(type: VehicleType): ParkingSpace | undefined {};

  // enter space, sets enter timestamp timestamp
  enterSpace(space: ParkingSpace) {};
  private freeSpace(space: ParkingSpace) {};

  // pay for time, with cash
  payForParking(space: ParkingSpace, cash: number) {}
}