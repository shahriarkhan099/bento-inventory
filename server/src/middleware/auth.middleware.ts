import { NextFunction, Response } from "express";
import { getUserFromToken } from "../services/skeletion.service";
import { AuthRequest } from "../interfaces/authRequest.interface";

export async function authMiddleware(req:AuthRequest, res: Response, next: NextFunction) {
    try {
        const authHeaders = req.headers["authorization"];
        if (!authHeaders) return res.status(401).send({ message: "Unauthorized" })
        const check = await getUserFromToken(authHeaders);
        if (check) {
            req.user = check.user;
            req.token = authHeaders;
            next();
        } else res.status(403).send({ message: "Forbidden"})
    } catch (error) {
        console.log(error);
        res.status(401).send({ message: 'Unauthorized'})
    } 
}

export async function restaurantId(req:AuthRequest, res: Response, next: NextFunction) {
    try {
        let resId = 0;
        const authHeaders = req.headers["authorization"];
        if (!authHeaders) return res.status(401).send({ message: "Unauthorized" })
        const check = await getUserFromToken(authHeaders);
        if (check) {
            req.user = check.user;
            req.token = authHeaders;
            if(req.user.employeeInformation.restaurantId)
            resId = req.user.employeeInformation.restaurantId;
            res.status(200).send({ message: resId });
            console.log(req.user.employeeInformation.restaurantId);
        } else res.status(403).send({ message: "Forbidden"})
    } catch (error) {
        console.log(error);
        res.status(401).send({ message: 'Unauthorized'})
    } 
}