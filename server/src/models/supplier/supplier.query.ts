import { Op } from "sequelize";
import Supplier from "./supplier.model";
import { ISupplier } from "../../interfaces/supplier.interface";

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
      const createdSupplier = await Supplier.create(supplier);
      return createdSupplier;
    } catch (error) {
      throw new Error('Error creating supplier.');
    }
}

// export async function addSupplier2 (restaurantId: number, data: { name: string, address: string, contactNumber: string, email: string, label: string }) {
//   try {
//     const createdSupplier = await Supplier.create({ ...data, restaurantId });
//     return createdSupplier;
//   } catch (error) {
//     throw new Error('Error creating supplier.');
//   }
// }

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

