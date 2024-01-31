import express, { Express } from "express";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import config from "./config";
import sequelize from "./models";
import ingredientRouter from "./routers/ingredient.router";
import ingredientBatchRouter from "./routers/ingredientBatch.router";
import categoryRouter from "./routers/category.router";
import orderRouter from "./routers/order.router";
import supplierRouter from "./routers/supplier.router";
import wasteLogRouter from "./routers/wasteLog.router";
import consumptionRouter from "./routers/consumptionLog.router";
import deliveryBox from "./routers/deliveryBox.router";
import deliveryBoxBatch from "./routers/deliveryBoxBatch.router";
import vendorSideRouter from "./routers/vendorSide.router";
import autoPilotRouter from "./routers/autoPilot.router";
import cron from "node-cron";
import checkExpiryDateAndRemove from "./utils/expiryCheck.util";
import activateAutoPilot from "./utils/autoPilotChecker";
import authRouter from "./routers/auth.router";


const app: Express = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(express.json());

app.use("/v1/ingredient", ingredientRouter);
app.use("/v1/ingredientBatch", ingredientBatchRouter);
app.use("/v1/category", categoryRouter);
app.use("/v1/order", orderRouter);
app.use("/v1/supplier", supplierRouter);
app.use("/v1/wasteLog", wasteLogRouter);
app.use("/v1/consumptionLog", consumptionRouter);
app.use("/v1/deliveryBox", deliveryBox);
app.use("/v1/deliveryBoxBatch", deliveryBoxBatch);
app.use("/v1/vendorSide", vendorSideRouter);
app.use("/v1/autoPilot", autoPilotRouter);
app.use("/v1/authRouter", authRouter);

cron.schedule("0 0 * * *", checkExpiryDateAndRemove);

// cron.schedule("*/60 * * * * *", async () => {
cron.schedule("0 9 * * *", async () => {
  console.log('Running auto-pilot check at 9 AM');
  try {
    await activateAutoPilot();
    console.log('Auto-pilot completed');
  } catch (error) {
    console.error('Error in auto-pilot:', error);
  }
});

async function bootstrap() {
  try {
    await sequelize.sync();
    app.listen(config.PORT, () => {
      console.log(`[server]: Server is running on port ${config.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

bootstrap();
