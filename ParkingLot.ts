// Define a ParkingLot class to manage the parking lot and its operations
class ParkingLot {
    name: string;
    floors: number;
    handicappedSlots: ParkingSlot[];
    smallMidsizeSlots: ParkingSlot[];
    largeSlots: ParkingSlot[];

    constructor(name: string, floors: number, totalHandicapped: number, totalSmallMidsize: number, totalLarge: number) {
        this.name = name;
        this.floors = floors;
        this.handicappedSlots = this.generateParkingSlots(totalHandicapped);
        this.smallMidsizeSlots = this.generateParkingSlots(totalSmallMidsize);
        this.largeSlots = this.generateParkingSlots(totalLarge);
    }

    // Generate parking slots of a specific category
    private generateParkingSlots(totalSlots: number): ParkingSlot[] {
        const parkingSlots: ParkingSlot[] = [];
        for (let i = 1; i <= totalSlots; i++) {
            parkingSlots.push(new ParkingSlot(i));
        }
        return parkingSlots;
    }

    // Find available slot in a specific category
    findAvailableSlot(category: string): ParkingSlot | null {
        let slotsArray: ParkingSlot[] = [];
        switch (category) {
            case "handicapped":
                slotsArray = this.handicappedSlots;
                break;
            case "smallMidsize":
                slotsArray = this.smallMidsizeSlots;
                break;
            case "large":
                slotsArray = this.largeSlots;
                break;
            default:
                return null;
        }
        return slotsArray.find(slot => !slot.isOccupied) || null;
    }

    // Park a vehicle in the parking lot
    parkVehicle(category: string, vehicle: Vehicle): ParkingSlot | null {
        const availableSlot = this.findAvailableSlot(category);
        if (availableSlot) {
            availableSlot.parkVehicle(vehicle);
        }
        return availableSlot;
    }

    // Remove vehicle from the parking lot
    removeVehicle(slotNumber: number): Vehicle | null {
        let removedVehicle: Vehicle | null = null;
        const allSlots = [...this.handicappedSlots, ...this.smallMidsizeSlots, ...this.largeSlots];
        const foundSlot = allSlots.find(slot => slot.slotNumber === slotNumber);
        if (foundSlot && foundSlot.isOccupied) {
            removedVehicle = foundSlot.removeVehicle();
        }
        return removedVehicle;
    }

    // Get number of empty slots in each category
    getEmptySlotCounts(): { handicapped: number, smallMidsize: number, large: number } {
        const handicappedEmpty = this.handicappedSlots.filter(slot => !slot.isOccupied).length;
        const smallMidsizeEmpty = this.smallMidsizeSlots.filter(slot => !slot.isOccupied).length;
        const largeEmpty = this.largeSlots.filter(slot => !slot.isOccupied).length;
        return { handicapped: handicappedEmpty, smallMidsize: smallMidsizeEmpty, large: largeEmpty };
    }
}
// Create a parking lot instance
const parkingLot = new ParkingLot("Shopping Mall Parking", 3, 10, 20, 15);

// Create vehicles
const vehicle1 = new Vehicle("handicapped", new Date('2024-07-20T10:00:00'));
const vehicle2 = new Vehicle("smallMidsize", new Date('2024-07-20T11:30:00'));
const vehicle3 = new Vehicle("large", new Date('2024-07-20T12:45:00'));

// Park vehicles in the parking lot
const slot1 = parkingLot.parkVehicle("handicapped", vehicle1);
const slot2 = parkingLot.parkVehicle("smallMidsize", vehicle2);
const slot3 = parkingLot.parkVehicle("large", vehicle3);

// Simulate vehicles leaving after some time
const exitTimeVehicle1 = new Date('2024-07-20T15:30:00');
const exitTimeVehicle2 = new Date('2024-07-20T16:45:00');
const exitTimeVehicle3 = new Date('2024-07-20T18:00:00');

const duration1 = vehicle1.calculateDuration(exitTimeVehicle1);
const duration2 = vehicle2.calculateDuration(exitTimeVehicle2);
const duration3 = vehicle3.calculateDuration(exitTimeVehicle3);

const charge1 = duration1 * 10; // Example charge rate per hour for handicapped category
const charge2 = duration2 * 15; // Example charge rate per hour for small/midsize category
const charge3 = duration3 * 20; // Example charge rate per hour for large category

console.log(`Vehicle 1 charge: $${charge1.toFixed(2)}`);
console.log(`Vehicle 2 charge: $${charge2.toFixed(2)}`);
console.log(`Vehicle 3 charge: $${charge3.toFixed(2)}`);

// Display empty slot counts
const emptySlots = parkingLot.getEmptySlotCounts();
console.log("Empty Slots:");
console.log(`Handicapped: ${emptySlots.handicapped}`);
console.log(`Small/Midsize: ${emptySlots.smallMidsize}`);
console.log(`Large: ${emptySlots.large}`);
