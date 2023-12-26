import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import config from './config';
import sequelize from './models';
import ingredientRouter from './routers/ingredient.router';
import categoryRouter from './routers/category.router';
import cron from 'node-cron';
import checkExpiryAndMove from './utils/expiryCheck.util';

const app : Express = express();

app.use(cors({
  credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(express.json());

app.use('/v1/ingredient', ingredientRouter);
app.use('/v1/category', categoryRouter);

// cron.schedule('*/2 * * * * *', checkExpiryAndMove);
cron.schedule('59 23 * * *', checkExpiryAndMove);

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