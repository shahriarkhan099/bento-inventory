import { Op } from "sequelize";
import Supplier from "./supplier.model";
import { ISupplier } from "../../interfaces/supplier.interface";
import axios from "axios";

export async function findAllSuppliers (restaurantId: number) {
    try {
      const suppliers = await Supplier.findAll({
        where: {
          restaurantId: restaurantId
        }
      });

      return suppliers;
    } catch (error) {
      throw new Error('Error finding suppliers.');
    }
}

export async function addSupplier (supplier: ISupplier) {
    try {
      console.log(supplier);
      
      const createdSupplier = await Supplier.create(supplier);
      return createdSupplier;
    } catch (error) {
      console.log(error);
      throw new Error('Error creating supplier.');
    }
}

export async function updateSupplier (supplierId: number, supplier: ISupplier) {
    try {
      const updatedSupplier = await Supplier.update(supplier, {
        where: {
          id: supplierId
        }
      });
      return updatedSupplier;
    } catch (error) {
      throw new Error('Error updating supplier.');
    }
}

export async function findSupplierBySearchTerm (restaurantId: number, searchTerm: string) {
    try {
      const supplier = await Supplier.findAll({
        where: {
          name: {[Op.iLike]: `%${searchTerm}%`},
          restaurantId: restaurantId
        }
      });
      return supplier;
    } catch (error) {
      throw new Error('Error searching for supplier.');
    }
}

export async function deleteSupplier (supplierId: number) {
    try {
      const deletedSupplier = await Supplier.destroy({
        where: {
          id: supplierId
        }
      });
      return deletedSupplier;
    } catch (error) {
      throw new Error('Error deleting supplier.');
    }
}

export async function findSupplierByLabel (restaurantId: number, label: string) {
    try {
      const supplier = await Supplier.findAll({
        where: {
          label: label,
          restaurantId: restaurantId
        }
      });
      return supplier;
    } catch (error) {
      throw new Error('Error finding supplier.');
    }
}

export async function checkSupplierAndFindWhichHasEarliestDeliveryDate (restaurantId: number) {
  try {
    const suppliers = await findAllSuppliers(restaurantId);
    const dayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    let earliestSupplier;

    for (const supplier of suppliers) {
      const vendor = await axios.get(`http://localhost:5000/v1/vendor/${supplier.vendorId}`);
      if (vendor.data.data) {
        const openingHours = vendor.data.data.openingHours.start;
        const workingDays = vendor.data.data.workingDays;
        if (workingDays.includes(dayName)) {
          const openingHour = Number(openingHours.split(":")[0]);
          const currentHour = new Date().getHours();
          if (currentHour < openingHour) {
            earliestSupplier = supplier;
          }
        }
      }
    }

    return earliestSupplier;
  }
  catch (error) {
    console.log(error);
    throw new Error("Error finding supplier with earliest delivery date.");
  }
}
