import { Request, Response } from "express";
import { findAutoPilotOfRestaurant, createAutoPilotOfRestaurant, updateAutoPilotOfRestaurant,} from "../models/autoPilot/autoPilot.query";

export async function getAutoPilotOfRestaurant(req: Request, res: Response) {
  try {
    const restaurantId = Number(req.params.restaurantId);
    if (restaurantId) {
      const autoPilot = await findAutoPilotOfRestaurant(restaurantId);
      res.send(autoPilot);
    } else res.status(400).json({ message: "Invalid restaurant ID." });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function postAutoPilotToRestaurant(req: Request, res: Response) {
  try {
    const restaurantId = Number(req.params.restaurantId);
    if (restaurantId) {
      let {restaurantId, autoPilotSwitch} = req.body;
      if (restaurantId) {
        await createAutoPilotOfRestaurant(restaurantId, autoPilotSwitch);
        res.status(201).json("Created");
      } else {
        res.status(400).json({ message: "Invalid autoPilot information." });
      }
    } else res.status(400).json({ message: "Invalid restaurant ID." });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function putAutoPilotOfRestaurant(req: Request, res: Response) {
  try {
    const restaurantId = Number(req.params.restaurantId);
    if (restaurantId) {
      let autoPilot = req.body;
      autoPilot.restaurantId = restaurantId;
      if (restaurantId) {
        await updateAutoPilotOfRestaurant(autoPilot.restaurantId, autoPilot.autoPilotSwitch);
        res.status(201).json("Updated");
      } else {
        res.status(400).json({ message: "Invalid autoPilot information." });
      }
    } else res.status(400).json({ message: "Invalid restaurant ID." });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}