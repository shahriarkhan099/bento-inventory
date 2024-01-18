import express, { Request, Response, Router } from 'express';
const router = express.Router()
import axios from 'axios';

router.get("/getAll", async (req: Request, res: Response) => {
  try {
    const externalServerUrl = "http://localhost:5000/v1/vendor";

    const response = await axios.get(externalServerUrl);
    const externalData = response.data;
   
    
    const selectedData = externalData.vendors.map((vendor: any) => ({
    }));
    console.log(selectedData);

    res.send( selectedData);
  } catch (error: any) {

    console.error("Error fetching data:", error.message);
   
  }
});

export default  router;