import { Request, Response } from "express";
import { findAllSuppliers, addSupplier, updateSupplier, findSupplierBySearchTerm, deleteSupplier, findSupplierByLabel } from "../models/supplier/supplier.query";



export async function getAllSuppliers (req: Request, res: Response) {
  try {
    const supplier = await findAllSuppliers(parseInt(req.params.restaurantId));
    res.status(200).json({ suppliers: supplier });
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function createSupplier (req: Request, res: Response) {
  try {
    const restaurantId = Number(req.params.restaurantId);
    const newSupplier = req.body;
    console.log(newSupplier);
    
    newSupplier.restaurantId = restaurantId;
    if (restaurantId) {
      const supplier = await addSupplier(newSupplier);
      res.status(201).json({ supplier: supplier });
    } else res.status(400).json({ message: "Invalid supplier information." });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function editSupplier (req: Request, res: Response) {
  try {
    const supplierId = Number(req.params.supplierId);
    if (supplierId) {
      let newSupplier = req.body;
      if (typeof newSupplier.restaurantId === 'number') {
        const supplier = await updateSupplier(supplierId, newSupplier);
        res.status(200).json(supplier);
      } else res.status(400).json({ message: "Invalid supplier information." });
    } else res.status(400).json({ message: "Invalid supplier ID." });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function searchSupplier (req: Request, res: Response) {
  try {
    const restaurantId = Number(req.params.restaurantId);
    
    const search = req.query.q;
    const searchTerm = search?.toString();

    if (searchTerm) {
      const supplier = await findSupplierBySearchTerm(restaurantId, searchTerm);
      res.json({ suppliers: supplier });
    } else res.json({ suppliers: [] });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function deleteSupplierById (req: Request, res: Response) {
  try {
    const supplierId = Number(req.params.supplierId);
    if (supplierId) {
      const deletedSupplier = await deleteSupplier(supplierId);
      res.status(200).json(deletedSupplier);
    } else res.status(400).json({ message: "Invalid supplier ID." });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function getSupplierByLabel (req: Request, res: Response) {
  try {
    const restaurantId = Number(req.params.restaurantId);
    const label = req.params.label;
    if (restaurantId) {
      const supplier = await findSupplierByLabel(restaurantId, label);
      res.json({ suppliers: supplier });
    } else res.status(400).json({ message: "Invalid restaurant ID." });

  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}